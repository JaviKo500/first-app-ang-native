import { Component } from "@angular/core";
import { Text, View } from "@ng-native/components";
import { Linking } from "react-native";

@Component({
   selector: 'custom-footer',
   imports: [Text, View],
   template: `
   <view class="p-4 flex justify-center items-center border border-transparent border-t-zinc-200 dark:border-t-zinc-500">
      <text class="text-zinc-600 dark:text-zinc-400 mt-2">
         Created by
            <text
            pressable
            accessibilityRole="link"
            class="text-blue-300 active:opacity-60"
            (press)="open('https://github.com/JaviKo500')"
            >JaViKo500 - AN</text>
       </text>
   </view>
   `,
})

export class Footer{
   protected open(url: string) {
    void Linking.openURL(url);
  }
}