import { Component, computed, inject, signal } from "@angular/core";
import { ScrollView, View, Pressable } from "@ng-native/components";
import { lucidePlus, } from '@ng-icons/lucide';
import { NgIcon } from "@ng-native/icons";
import { provideIcons } from "@ng-icons/core";

import { HabitRow } from "../habits/habit-row";
import { Header } from "../header/header";
import { NewHabit } from "../habits/new-habit";
import { EmptyState } from "../shared/empty-state";
import { Habit } from "../interfaces/habit.interface";
import { NativeNavigation } from "@ng-native/router";

@Component({
   selector: 'home-app',
   imports: [HabitRow, Header, EmptyState, View, ScrollView, Pressable, NgIcon],
   providers: [ provideIcons({ lucidePlus, }) ],
   template: `
      <view class="flex-1 gap-2 bg-zinc-100 px-5 pt-safe dark:bg-black">
        <app-header 
            title="Today"
            subtitle="{{remaining() }} left to do">
            <pressable 
               actions accessibilityRole="button"  
               accessibilityLabel="Add habit"
               (press)="addHabit()"
            >
               <ng-icon name="lucidePlus" size="22" class="text-zinc-700 dark:text-zinc-200"  />
            </pressable>
         </app-header>
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
   `,
   host: { style: 'flex: 1' },
})

export class Home {

   private readonly navigation = inject(NativeNavigation);

   protected addHabit(): void {
      void this.navigation.present(['/habit/new'], {
         as: 'formSheet',
         presentation: {
            sheetAllowedDetents: [0.6, 1],
            sheetGrabberVisible: true,
         },
      });
   }

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