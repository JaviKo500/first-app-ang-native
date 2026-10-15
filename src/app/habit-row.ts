import { Component, input, output } from "@angular/core";
import { Pressable, Text } from "@ng-native/components";

@Component({
   selector: 'habit-row',
   imports: [Text, Pressable],
   template: `
      <pressable class="flex-row  items-center justify-between mt-2 p-4 rounded-xl bg-white dark:bg-gray-800 active:bg-zinc-200 dark:active:bg-zinc-800" accessibilityRole="button" (press)="toggle.emit()">
         <text class="text-base text-zinc-900 dark:text-white">{{ name() }}</text>
         <text [class]="done() ? 'text-emerald-600':'text-zinc-400'">
            {{ done() ? 'Done' : 'To do' }}
         </text>
      </pressable>
   `,
})

export class HabitRow {
   readonly name = input.required<string>();
   readonly done = input(false);
   readonly toggle = output<void>();
}