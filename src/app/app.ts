import { Component, computed, inject, signal } from '@angular/core';
import { SafeAreaProvider, ScrollView, View } from '@ng-native/components';
import { HabitRow } from './habit-row';
import { ThemeService } from './header/theme.service';
import { Header } from './header/header';
import { NewHabit } from './habits/new-habit';
import { EmptyState } from './shared/empty-state';

/**
 * Element names are lowercase, and that is load-bearing rather than style: an uppercase name is
 * read as an unknown Angular component and commits as a plain view with nothing in it.
 */
interface Habit {
  readonly id: string;
  readonly name: string;
  readonly done: boolean;
}

@Component({
  imports: [HabitRow, Header, NewHabit, EmptyState, View, ScrollView, SafeAreaProvider],
  selector: 'app-root',
  template: `
    <safe-area-provider>
      <view class="flex-1 gap-2 bg-zinc-100 px-5 pt-safe dark:bg-black">
        <app-header [remaining]="remaining()"/>
        <new-habit (add)="add($event)" />
        <scroll-view [contentContainerStyle]="{gap:8}">
          @for (habit of habits(); track habit.id) {
            <habit-row [name]="habit.name" [done]="habit.done" (toggle)="toggle(habit.id)"/>
          } @empty {
            <empty-state 
              title="No habits!" 
              subtitle="You don't have habits added" 
            />
          }
        </scroll-view>
      </view>
    </safe-area-provider> 
  `,
  host: {
    ['class.dark']: 'theme.isDark()',
  }
})


export class App {
  protected readonly habits = signal<Habit[]>([]);

  protected readonly remaining = computed( () => this.habits().filter(habit => !habit.done).length);

  protected toggle(id: string) {
    this.habits.update( (habits) => 
      habits.map( habit => habit.id === id ? { ...habit, done: !habit.done }: habit )
    );
  }
  
  protected readonly theme = inject(ThemeService);

  private nextHabitId = 0;

  protected add( name: string ) {
    const id = `habit${++this.nextHabitId}`;
    this.habits.update( (habits) => [ ...habits, { id, name, done: false } ]);
  }

}
