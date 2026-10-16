import { Component } from "@angular/core";
import { Pressable, Text } from "@ng-native/components";

@Component({
   selector: 'theme',
   imports: [Pressable, Text],
   template: `
      <pressable class="flex-row items-center rounded-lg active:bg-zinc-300 py-3" >
         <text class="text-sm font-medium text-gray-900 dark:text-gray-300">Theme: </text>
      </pressable>
   `,
})

export class Theme {

}