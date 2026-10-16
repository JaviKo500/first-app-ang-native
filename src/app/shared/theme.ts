import { Component, inject, input } from "@angular/core";
import { provideIcons } from '@ng-icons/core';
import { Pressable, Text } from "@ng-native/components";
import { NgIcon } from "@ng-native/icons";
import { lucideSun, lucideMoon } from '@ng-icons/lucide';

import { ThemeService } from "../header/theme.service";

@Component({
   selector: 'theme',
   imports: [Pressable, Text, NgIcon],
   providers: [provideIcons({ lucideSun, lucideMoon })],
   template: `
      <pressable 
         class="flex-row items-center justify-between rounded-lg active:bg-zinc-300 py-3" 
         (press)="changeTheme()"
      >
         <text class="text-base font-normal text-gray-900 dark:text-gray-300">{{ isDark ? 'Light mode' : 'Dark mode' }}</text>
         
         @if ( isDark ) {
            <ng-icon name="lucideSun" size="20" class="text-amber-400"/>
         } @else {
            <ng-icon name="lucideMoon" size="20" class="text-indigo-600"/>
         }
      </pressable>
   `,
})

export class Theme {
   protected readonly theme = inject(ThemeService);

   protected changeTheme() {
      this.theme.choose(this.theme.className() === 'dark' ? 'light' : 'dark');
   }

   protected get isDark() {
      return this.theme.className() === 'dark';
   }

}