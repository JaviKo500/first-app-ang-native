import { computed, Service, signal } from "@angular/core";
import { habitsDatabase } from "./habits.database";
import { Habit } from "../interfaces/habit.interface";

const PALETTE = ['#f43f5e', '#f97316', '#eab308', '#22c55e', '#0ea5e9', '#8b5cf6'];

/** One day as `YYYY-MM-DD`, in local time - never UTC, or a completion made at 11pm lands on the wrong day. */
export function isoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Adds or removes one date from a set of completions, without touching the set passed in. */
export function toggleCompletion( days: ReadonlySet<string>, date: string ): ReadonlySet<string> {
  const next = new Set(days);
  if ( next.has( date ) ) next.delete(date);
  else next.add(date);
  return next;
}

@Service()
export class HabitsService {
  readonly palette: readonly string [] = PALETTE;
  private readonly all = signal<readonly Habit[]>([]);
  private readonly done = signal<ReadonlyMap<string, ReadonlySet<string>>>(new Map());


  readonly habits = this.all.asReadonly();

  readonly remaining = computed(() => {
    const habits = this.all();
    const today = isoDate(new Date());
    return habits.filter(habit => !this.done().get(habit.id)?.has(today)).length;
  });

  constructor() {
    void this.loadFromDatabase();
  }

  private async loadFromDatabase(): Promise<void> {
    const db = await habitsDatabase.ready();
    const rows = await db.getAllAsync<{
      id: string;
      name: string;
      color: string;
      created_at: string;
    }>(
      'SELECT * FROM habit ORDER BY created_at;'
    );

    const completions = await db.getAllAsync<{ habit_id: string; date: string }>(
      'SELECT habit_id, date FROM completion',
    );

    const grouped = new Map<string, Set<string>>();
    for (const row of completions) {
      const set = grouped.get(row.habit_id) ?? new Set<string>();
      set.add(row.date);
      grouped.set(row.habit_id, set);
    }


    this.all.set(
      rows.map((row) => ({
        id: row.id,
        name: row.name,
        color: row.color,
        createdAt: row.created_at,
      }) as Habit),
    );

    this.done.set( grouped );
  }

  completions( id:string ): ReadonlySet<string> {
    return this.done().get(id) ?? new Set();
  }

  isDone( id: string, date = new Date() ): boolean {
    return this.completions( id ).has( isoDate( date ) );
  }

  create( habit: { name: string, color: string, } ): Habit {
    const created: Habit = {
      id: `h${Date.now().toString(36)}${Math.floor( Math.random() * 1_000).toString(36)}`,
      name: habit.name.trim(),
      color: habit.color,
      createdAt: isoDate( new Date() ),
    };

    void habitsDatabase
      .ready()
      .then( ( db ) => {
        this.persistHabit(db, created).then( () =>{
          this.all.update( (all) => [ ...all, created ] );
        });
      })
      .catch( ( error ) => { 
        console.log('<--------------- JK Habits.service Error --------------->');
        console.log(error); 
      });
    
    return created;
  }

  toggleToday( id: string, date = new Date() ): void {
    const iso = isoDate( date );
    this.done.update( ( all ) => {
      const next = new Map(all);
      next.set( id, toggleCompletion( next.get(id) ?? new Set(), iso ) );
      return next;
    });
    const nowDone = this.isDone(id, date);
    void habitsDatabase
      .ready()
      .then( ( db ) => {
        nowDone
          ? db.runAsync(`INSERT OR IGNORE INTO completion ( habit_id, date ) values ( ?, ?)`, id, iso)
          : db.runAsync(`DELETE FROM completion WHERE habit_id = ? AND DATE = ?`, id, iso)
      })
      .catch( ( error ) => {
        console.log('<--------------- JK Habits.service Error --------------->');
        console.log(error);
      });
  }

  remove(id: string): void {
    this.all.update( all => all.filter( h  => h.id !== id) );
    this.done.update( all => {
      const next = new Map(all);
      next.delete(id);
      return next;
    });

    void habitsDatabase
      .ready()
      .then( db => {
        db.withTransactionAsync( async () => {
          await db.runAsync(`DELETE FROM habit WHERE id = ?`, id);
          await db.runAsync(`DELETE FROM completion WHERE habit_id = ?`, id);
        });
      })
      .catch( err => {
        console.log('<--------------- JK Habits.service Error --------------->');
        console.log(err);
      })
  }

  private persistHabit( db: Awaited<ReturnType<typeof habitsDatabase.ready>>, habit: Habit ) {
    return db.runAsync(
      `INSERT INTO habit ( id, name, color, created_at ) VALUES (?,?,?,?)
      ON CONFLICT(id) DO UPDATE SET name = excluded.name, color = excluded.color`,
      habit.id,
      habit.name,
      habit.color,
      habit.createdAt,
    );
  }
}