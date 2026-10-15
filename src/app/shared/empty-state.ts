import { Component, input } from "@angular/core";
import { Text, View } from "@ng-native/components";

@Component({
   selector: 'empty-state',
   imports: [View, Text],
   template: `
      <view class="justify-center items-center">
         <text class="text-2xl text-zinc-500 dark:text-zinc-200">{{title()}}</text>
         @if ( subtitle().length ) {
            <text class="text text-zinc-500 dark:text-zinc-400 mt-2">{{subtitle()}}</text>
         }
      </view>
   `,
})

export class EmptyState{
   readonly title = input.required<string>();
   readonly subtitle = input<string>('');
}