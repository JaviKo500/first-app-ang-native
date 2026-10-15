import { Component, inject, input } from "@angular/core";
import { Pressable, Text, View } from "@ng-native/components";
import { ThemeService } from "./theme.service";

@Component({
   imports: [View, Text, Pressable],
   selector: 'app-header',
   template:`
      <view class="flex-row items-center justify-between pt-4">
        <text class="text-3xl font-bold text-zinc-900 android:text-2xl android:font-normal dark:text-white">Today</text>
        <pressable class="flex-row items-center rounded-lg p-2 active:bg-zinc-300 b" (press)="theme.choose(theme.className() === 'dark' ? 'light' : 'dark')">
          <text class="text-zinc-600 dark:text-zinc-300">Theme: {{theme.className()}}</text>
        </pressable>
      </view>
      <text class="text-zinc-500 dark:text-zinc-300 ios:text-xs ios:font-semibold ios:uppercase">{{ remaining() }} left to do</text>
   `
})

export class Header {
   protected readonly theme = inject(ThemeService);

   readonly remaining = input.required<number>();
}