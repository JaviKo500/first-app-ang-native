import { Component } from "@angular/core";
import { Text, View } from "@ng-native/components";
import { Linking } from "react-native";

@Component({
   selector: 'custom-footer',
   imports: [Text, View],
   host: { class: 'mt-auto' },
   template: `
      <view class="p-6 items-center gap-2">
         <text class="text-zinc-600 dark:text-zinc-400">
            Created by
               <text
               pressable
               accessibilityRole="link"
               class="text-blue-300 active:opacity-60"
               (press)="open('https://github.com/JaviKo500')"
               >JaViKo500 - AN</text>
         </text>
         <text class="text-xs android:text-sm ios:text-sm font-light text-zinc-400"> V 1.0.0 </text>
      </view>
   `,
})

export class Footer{
   protected open(url: string) {
    void Linking.openURL(url);
  }
}