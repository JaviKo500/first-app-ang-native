import { Component, computed, signal } from "@angular/core";
import { ScrollView, View } from "@ng-native/components";

import { HabitRow } from "../habits/habit-row";
import { Header } from "../header/header";
import { NewHabit } from "../habits/new-habit";
import { EmptyState } from "../shared/empty-state";
import { Footer } from "../shared/footer";
import { Habit } from "../interfaces/habit.interface";

@Component({
   selector: 'home-app',
   imports: [HabitRow, Header, NewHabit, EmptyState, Footer, View, ScrollView,],
   template: `
      <view class="flex-1 gap-2 bg-zinc-100 px-5 pt-safe dark:bg-black">
        <app-header 
            title="Today"
            subtitle="{{remaining() }} left to do"/>
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
        <custom-footer/>
      </view>
   `,
   host: { style: 'flex: 1' },
})

export class Home {
   protected readonly habits = signal<Habit[]>([]);

   protected readonly remaining = computed(() => this.habits().filter(habit => !habit.done).length);

   protected toggle(id: string) {
      this.habits.update((habits) =>
         habits.map(habit => habit.id === id ? { ...habit, done: !habit.done } : habit)
      );
   }

   private nextHabitId = 0;

   protected add(name: string) {
      const id = `habit${++this.nextHabitId}`;
      this.habits.update((habits) => [...habits, { id, name, done: false }]);
   }
}