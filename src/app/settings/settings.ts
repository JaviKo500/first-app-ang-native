import { Component } from "@angular/core";
import { Text, View } from "@ng-native/components";
import { Theme } from "../shared/theme";
import { Header } from "../header/header";
import { Footer } from "../shared/footer";

@Component({
   selector: 'settings',
   imports: [Header, Theme, View, Text, Footer],
   template:`
      <view class="flex-1 gap-2 bg-zinc-100 px-5 pt-safe pb-safe-20 android:pb-safe-18 ios:pb-safe-18 dark:bg-black">
         <app-header 
            title="Settings"
            subtitle="User preferences"/>
         <text class="text-xl font-medium text-zinc-900 mb-1 android:text-lg android:font-normal dark:text-white">Preferences</text>
         <view class="rounded-lg border border-gray-200 bg-white p-2 dark:bg-zinc-900">
            <view class="divide-y divide-gray-200">
               <theme/>
            </view>
         </view>
         <custom-footer/>
      </view>
   `,
   host: {
      style: 'flex: 1'
   }
})

export class Setting {

}