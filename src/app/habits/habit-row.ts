import { Component, input, output } from "@angular/core";
import { Pressable, Text, View } from "@ng-native/components";
import { lucideCheck, lucideCalendar } from '@ng-icons/lucide';
import { NgIcon } from "@ng-native/icons";

import { Habit } from "../interfaces/habit.interface";
import { provideIcons } from "@ng-icons/core";

@Component({
   selector: 'habit-row',
   imports: [Text, Pressable, NgIcon, View],
   providers: [ provideIcons({ lucideCheck, lucideCalendar, }) ],
   template: `
      <view class="row">
         <pressable
            class="checkbox"
            accessibilityRole="checkbox"
            [accessibilityLabel]="habit().name"
            [accessibilityState]="{checked: done()}"
            [attr.data-done]="done() ? '' : null"
            [style.border-color]="habit().color"
            [style.background-color]="done() ? habit().color : 'transparent'"
            (press)="toggle.emit()"
            (longPress)="toggle.emit()"
   
         >
            @if ( done() ) {
               <ng-icon class="mark text-white" name="lucideCheck" size="18" />
            }
         </pressable>
         <pressable 
            class="body"
            accessibilityRole="button" 
            [accessibilityLabel]="habit().name"
            (press)="toggle.emit()"
            (longPress)="remove.emit()"
         >
            <text class="name" [class]="done() ? 'done' : ''">{{ habit().name }}</text>
            <view class="flex-row justify-between items-center">
               <view class="flex-row items-center gap-1">
                  <ng-icon name="lucideCalendar" size="14" class="text-zinc-400 dark:text-zinc-400" />
                  <text class="text-sm font-normal text-zinc-400 dark:text-zinc-400">{{ habit().createdAt }}</text>
               </view>
               <text class="text-xs font-light text-zinc-400 dark:text-zinc-400">{{ habit().id }}</text>
            </view>
         </pressable>
      </view>
   `,
   styleUrl: './habit-row.css',
})

export class HabitRow {
   readonly habit = input.required<Habit>();
   readonly done = input.required<boolean>();
   readonly toggle = output<void>();
   readonly remove = output<void>();

}