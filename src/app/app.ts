import { Component, computed, inject, signal } from '@angular/core';
import { Pressable, ScrollView, Text, View } from '@ng-native/components';
import { HabitRow } from './habit-row';
import { ThemeService } from './theme.service';

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
  imports: [HabitRow, Text, View, ScrollView, Pressable],
  selector: 'app-root',
  template: `
    <view class="flex-1 gap-2 bg-zinc-100 px-5 pt-safe mt-8 dark:bg-black">
      <view class="flex-row items-center justify-between pt-4">
        <text class="text-3xl font-bold text-zinc-900 android:text-2xl android:font-normal dark:text-white">Today</text>
        <pressable class="flex-row items-center rounded-lg p-2 active:bg-zinc-300 b" (press)="theme.choose(theme.className() === 'dark' ? 'light' : 'dark')">
          <text class="text-zinc-600 dark:text-zinc-300">Theme: {{theme.className()}}</text>
        </pressable>
      </view>
      <text class="text-zinc-500 ios:text-xs ios:font-semibold ios:uppercase">{{ remaining() }} left to do</text>
      <scroll-view [contentContainerStyle]="{gap:8}">
        @for (habit of habits(); track habit.id) {
          <habit-row [name]="habit.name" [done]="habit.done" (toggle)="toggle(habit.id)"/>
        } @empty {
          <text class="text-zinc-500">No habits yet</text>
        }
      </scroll-view>
    </view>
  `,
  host: {
    ['class.dark']: 'theme.isDark()',
  }
})


export class App {
  protected readonly habits = signal<Habit[]>([
    { id: 'water', name: 'Drink water', done: false },
    { id: 'eat', name: 'Eat breakfast', done: false },
    { id: 'running', name: 'Run for 30 minutes', done: false },
    { id: 'sleep', name: 'Get 8 hours of sleep', done: false },
    { id: 'work', name: 'Work', done: false },
    { id: 'walk', name: 'Walk', done: true },
  ]);

  protected readonly remaining = computed( () => this.habits().filter(habit => !habit.done).length);

  protected toggle(id: string) {
    this.habits.update( (habits) => 
      habits.map( habit => habit.id === id ? { ...habit, done: !habit.done }: habit )
    );
  }
  
  protected readonly theme = inject(ThemeService);
}
