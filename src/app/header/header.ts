import { Component, input } from "@angular/core";
import { Text, View } from "@ng-native/components";

@Component({
   imports: [View, Text],
   selector: 'app-header',
   template:`
      <view class="flex-row items-center justify-between pt-4">
        <text class="text-3xl font-bold text-zinc-900 android:text-2xl android:font-normal dark:text-white">{{title()}}</text>
      </view>
      <text class="text-zinc-500 dark:text-zinc-300 ios:text-xs ios:font-semibold ios:uppercase mb-4">{{ subtitle() }}</text>
   `
})

export class Header {
   protected readonly title = input.required<string>();
   protected readonly subtitle = input<string>();
}