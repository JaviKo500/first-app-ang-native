import { Service, signal } from "@angular/core";
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

@Service()
export class HabitsService {
  readonly palette: readonly string [] = PALETTE;
  private readonly all = signal<readonly Habit[]>([]);

  readonly habits = this.all.asReadonly();

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
    this.all.set(
      rows.map((row) => ({
        id: row.id,
        name: row.name,
        color: row.color,
        createdAt: row.created_at,
      }) as Habit),
    );
  }

  create( habit: { name: string, color: string, } ): Habit {
    const created: Habit = {
      id: `h${Date.now().toString(36)}${Math.floor( Math.random() * 1_000).toString(36)}`,
      name: habit.name.trim(),
      done: false,
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