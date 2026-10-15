import { Component, signal } from "@angular/core";
import { Text, TextInput, View } from "@ng-native/components";
import { form, FormField, maxLength, required} from '@angular/forms/signals';


@Component({
   imports: [FormField, View, TextInput, Text],
   selector: 'new-habit',
   template: `
      <view class="mt-2 flex-row gap-2">
         <text-input
            class="flex-1 rounded-xl bg-white dark:bg-gray-600 px-4 py-4 text-base text-zinc-900 dark:text-white dark:placeholder:text-zinc-400"
            placeholder="New habit"
            [formField]="habit.name"
         />
      </view>
      @if ( habit.name().touched() && habit.name().invalid() ) {
         <text class="text-sm text-red-500 mt-0.5" accessibilityRole="alert">
            {{habit.name().errors().at(-1)?.message}}
         </text>
      }
   `,
})

export class NewHabit {
   protected readonly model = signal<{name: string}>({ name: '' } );
   protected readonly habit = form(this.model, ( path ) => {
      required( path.name, { message: 'Give the habit a name' } );
      maxLength(path.name, 30, { message: 'Max 30 characters' });
   });
}