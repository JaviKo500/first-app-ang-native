import { Component, input, output } from "@angular/core";
import { Pressable, Text } from "@ng-native/components";

@Component({
   selector: 'habit-row',
   imports: [Text, Pressable],
   template: `
      <pressable class="flex flex-row justify-between mt-2 p-3 rounded-xl bg-white active:bg-zinc-200" accessibilityRole="button" (press)="toggle.emit()">
         <text>{{ name() }}</text>
         <text class="text-zinc-400">{{ done() ? 'Done' : 'To do' }}</text>
      </pressable>
   `,
})

export class HabitRow {
   readonly name = input.required<string>();
   readonly done = input(false);
   readonly toggle = output<void>();
}