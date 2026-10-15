import { Component, computed, inject, signal } from '@angular/core';
import { ScrollView, Text, View } from '@ng-native/components';
import { HabitRow } from './habit-row';
import { ThemeService } from './header/theme.service';
import { Header } from './header/header';
import { NewHabit } from './habits/new-habit';

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
  imports: [HabitRow, Header, NewHabit, Text, View, ScrollView],
  selector: 'app-root',
  template: `
    <view class="flex-1 gap-2 bg-zinc-100 px-5 pt-safe mt-8 dark:bg-black">
      <app-header/>
      <text class="text-zinc-500 dark:text-zinc-300 ios:text-xs ios:font-semibold ios:uppercase">{{ remaining() }} left to do</text>
      <new-habit (add)="add($event)" />
      <scroll-view [contentContainerStyle]="{gap:8}">
        @for (habit of habits(); track habit.id) {
          <habit-row [name]="habit.name" [done]="habit.done" (toggle)="toggle(habit.id)"/>
        } @empty {
          <view class="justify-center items-center">
            <text class="text-2xl text-zinc-500 dark:text-zinc-200">No habits!</text>
            <text class="text text-zinc-500 dark:text-zinc-400 mt-2">You don't have habits added</text>
          </view>
        }
      </scroll-view>
    </view>
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
