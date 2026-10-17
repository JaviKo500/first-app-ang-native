import { Component, input } from "@angular/core";
import { Text, View } from "@ng-native/components";

@Component({
   imports: [View, Text],
   selector: 'app-header',
   template:`
      <view class="flex-row items-center justify-between py-4">
         <view class="">
            <text class="text-3xl font-bold text-zinc-900 android:text-2xl android:font-normal dark:text-white">{{title()}}</text>
            <text class="text-zinc-500 dark:text-zinc-300 ios:text-xs ios:font-semibold ios:uppercase">{{ subtitle() }}</text>
         </view>
         <!-- actions slot -->
          <view class="flex-row items-center gap-2">
            <ng-content select="[actions]" />
          </view>
      </view>
   `
})

export class Header {
   protected readonly title = input.required<string>();
   protected readonly subtitle = input<string>();
}