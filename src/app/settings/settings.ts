import { Component } from "@angular/core";
import { Text, View } from "@ng-native/components";
import { Theme } from "../shared/theme";

@Component({
   selector: 'settings',
   imports: [ Theme, View, Text ],
   template:`
      <view class="flex-1 gap-2 bg-zinc-100 px-5 pt-safe dark:bg-black">
         <text class="text-3xl font-bold text-zinc-900 android:text-2xl android:font-normal dark:text-white">Settings</text>
         <text class="text-zinc-500 dark:text-zinc-300 ios:text-xs ios:font-semibold ios:uppercase">User preferences</text>
         <view class="rounded-lg border border-gray-200 bg-white p-6 dark:bg-zinc-900">
         <text class="text-3xl font-medium text-zinc-900 mb-4 android:text-2xl android:font-normal dark:text-white">Preferences</text>
            <view class="divide-y divide-gray-200">
               <theme/>
            </view>
         </view>
      </view>
   `,
   host: {
      style: 'flex: 1'
   }
})

export class Setting {

}