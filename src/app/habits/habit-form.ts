import { Component, computed, inject } from "@angular/core";
import { Pressable, ScrollView, Text, TextInput, View, SafeAreaView } from "@ng-native/components";
import { NativeNavigation } from "@ng-native/router";
import { HabitsService } from "../data/habits.service";

@Component({
  selector: 'habit-form',
  imports: [TextInput, ScrollView, Text, View, Pressable, SafeAreaView],
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
          (press)="submit()"
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
          />
          <text class="mt-5 text-xs font-semibold tracking-wide text-zinc-500 uppercase">Color</text>
          <view class="flex-row flex-wrap gap-3">
            @for (color of palette; track color) {
              <pressable
                class="size-10 items-center justify-center rounded-full"
                [style.background-color]="color"
                accessibilityRole="button"
                [accessibilityLabel]="'Color ' + color"
              >
                <view class="size-3 rounded-full bg-white"></view>
              </pressable>
            }
          </view>
        </view>  
      </scroll-view>
    </safe-area-view>
  `,
  host: {
    style: 'flex: 1',
    // '[preventNativeDismiss]': 'dirty()',
    // '(nativeDismissCancelled)': 'confirmDiscard()',
  },
})

export class HabitForm {
  private readonly navigation = inject(NativeNavigation);
  private readonly habitsService = inject(HabitsService);

  protected title = computed( () => 'New habit' );
  protected palette = this.habitsService.palette;

  protected submit(): void {

  }

  protected close(): void {
    this.navigation.back()
  }
}