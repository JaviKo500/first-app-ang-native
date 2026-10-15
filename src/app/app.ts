import { Component, computed, signal } from '@angular/core';
import { Pressable, ScrollView, Text, View } from '@ng-native/components';
import { HabitRow } from './habit-row';

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
  imports: [Text, View, ScrollView, HabitRow],
  selector: 'app-root',
  template: `
    <view class="screen">
      <text class="title">Today</text>
      <text class="summary">{{ remaining() }} left to do</text>
      <scroll-view [contentContainerStyle]="{gap:8}">
        @for (habit of habits(); track habit.id) {
          <habit-row [name]="habit.name" [done]="habit.done" (toggle)="toggle(habit.id)"/>
        } @empty {
          <text class="summary">No habits yet</text>
        }
      </scroll-view>
    </view>
  `,
  styles: `
  .screen {
    flex: 1;
    gap: 8px;
    padding: 64px 20px;
    padding-top: calc(var(--safe-area-inset-top, 0px) + 64px);
    background-color: #f4f4f5;
  }
  .title {
    font-size: 30px;
    font-weight: 700;
  }
  .summary {
    color: #71717a;
  }
  
  `,
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
}
