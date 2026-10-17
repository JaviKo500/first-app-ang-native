import { Component, output, signal } from "@angular/core";
import { Pressable, Text, TextInput, View } from "@ng-native/components";
import { form, FormField, maxLength, required, submit} from '@angular/forms/signals';


@Component({
   imports: [FormField, View, TextInput, Text, Pressable],
   selector: 'new-habit',
   template: `
      <view class="flex-row gap-2">
         <text-input
            class="flex-1 rounded-xl border border-zinc-400 dark:border-zinc-600 focus:border-emerald-600 bg-white px-4 py-3 text-base text-zinc-900 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-400"
            placeholder="New habit"
            [formField]="habit.name"
            returnKeyType="done"
            submitBehavior="submit"
            (submitEditing)="save()"
         />
         <pressable 
            class="justify-center rounded-xl bg-emerald-600 px-4 active:bg-emerald-700"
            accessibilityRole="button"
            (press)="save()"   
         >
            <text class="font-semibold text-white">Add</text>
         </pressable>
      </view>
      @if ( habit.name().touched() && (habit.name().dirty() || attempted()) ) {
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

   readonly add = output<string>();

   protected readonly attempted = signal(false);

   protected save(): void {
      this.attempted.set(true);
      void submit( this.habit, async () => {
         this.add.emit( this.model().name );
         this.habit().reset({ name: '' });
         this.attempted.set(false);
         return undefined;
      })
   }
}