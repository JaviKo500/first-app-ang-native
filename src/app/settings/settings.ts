import { Component } from "@angular/core";
import { Text, View } from "@ng-native/components";
import { Theme } from "../shared/theme";

@Component({
   selector: 'settings',
   imports: [ Theme, View, Text ],
   template:`
      <view class="flex-1 gap-2 bg-zinc-100 px-5 pt-safe">
         <view class="rounded-lg border border-gray-200 bg-white p-6">
         <text class="text-sm font-medium text-zinc-900 mb-4">Settings</text>
            <view class="divide-y divide-gray-200">
               <theme/>
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