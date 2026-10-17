import { Component, computed, inject, linkedSignal } from "@angular/core";
import { Pressable, ScrollView, Text, TextInput, View, SafeAreaView } from "@ng-native/components";
import { NativeNavigation } from "@ng-native/router";
import { HabitsService } from "../data/habits.service";
import { form, required, validate, FormField, submit } from "@angular/forms/signals";

@Component({
  selector: 'habit-form',
  imports: [TextInput, ScrollView, Text, View, Pressable, SafeAreaView, FormField],
  template: `
    <safe-area-view class="flex-1 bg-zinc-100 dark:bg-black android:rounded-t-3xl android:overflow-hidden" [edges]="['top', 'bottom']">
      <view class="hidden android:flex self-center mt-2 h-1 w-10 rounded-full bg-zinc-300 dark:bg-zinc-700"></view>
      <view class="flex-row items-center justify-between px-5 py-3">
        <pressable 
          accessibilityRole="button" 
          (press)="close()"
        >
          <text class="text-base text-rose-600">Cancel</text>
        </pressable>
        <text class="text-base font-semibold text-zinc-900 dark:text-white">{{ title() }} </text>
        <pressable 
          accessibilityRole="button"
          (press)="save()"
        >
          <text class="text-base font-semibold text-rose-600">Save</text>
        </pressable>
      </view>
      <scroll-view class="flex-1" keyboardShouldPersistTaps="handled">
        <view class="gap-2 px-5 pb-8">
          <text class="mt-3 text-xs font-semibold tracking-wide text-zinc-500 uppercase" >Name</text>
          <text-input
            class="rounded-2xl border border-zinc-200 bg-white p-4 text-[16px] text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
            placeholder="Drink water"
            accessibilityLabel="Habit name"
            autoCapitalize="sentences"
            [formField]="formHabit.name"
          />
          @if (formHabit.name().touched() && formHabit.name().errors()[0]; as error) {
            <text class="text-sm text-rose-600">{{ error.message }}</text>
          }
          <text class="mt-5 text-xs font-semibold tracking-wide text-zinc-500 uppercase">Color</text>
          <view class="flex-row flex-wrap gap-3">
            @for (color of palette; track color) {
              <pressable
                class="size-10 items-center justify-center rounded-full"
                [style.background-color]="color"
                accessibilityRole="button"
                [accessibilityLabel]="'Color ' + color"
                [accessibilityState]="{ selected: data().color === color}"
                (press)="choose(color)"
              >
                @if ( data().color === color ) {
                  <view class="size-3 rounded-full bg-white"></view>
                }
              </pressable>
            }
          </view>
        </view>  
      </scroll-view>
    </safe-area-view>
  `,
  host: {
    style: 'flex: 1',
  },
})

export class HabitForm {
  private readonly navigation = inject(NativeNavigation);
  private readonly habitsService = inject(HabitsService);

  protected readonly title = computed( () => 'New habit' );
  protected readonly palette = this.habitsService.palette;

  protected readonly data = linkedSignal( () => {
    return {
      name: '',
      color: '',
    };
  });

  protected readonly formHabit = form( this.data, ( path ) => {
    required( path.name, { message: 'Give it a name' } );
    validate( path.name, ( { value }) => {
      const name = value().trim();
      if( !name ) {
        return {
          kind: 'empty',
          message: 'Give it a name',
        };
      }

      return undefined;
    })
  });

  protected save(): void {

    void submit( this.formHabit, async () => {
      this.formHabit().reset({
        name: '',
        color: '',
      });
      this.navigation.back();
    })
  }

  protected choose( value: string ): void {
    this.data.update( d => ( { ...d, color: value } ) );
  }

  protected close(): void {
    this.navigation.back()
  }
}