import { Component, inject } from "@angular/core";
import { Text, View, Pressable } from "@ng-native/components";
import { NgIcon } from "@ng-native/icons";
import { provideIcons } from "@ng-icons/core";
import { lucideTrash } from '@ng-icons/lucide';
import { Theme } from "../shared/theme";
import { Header } from "../header/header";
import { Footer } from "../shared/footer";
import { HabitsService } from "../data/habits.service";
import { Dialogs } from "@ng-native/device";

@Component({
   selector: 'settings',
   imports: [Header, Theme, View, Text, Footer, Pressable, NgIcon],
   providers: [ provideIcons({lucideTrash,}) ],
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
         <text class="text-xl font-medium text-red-600 mb-1 android:text-lg android:font-normal dark:text-red-400">Danger zone</text>
         <view class="rounded-lg border border-gray-200 bg-white p-2 dark:bg-zinc-900">
            <view class="divide-y divide-gray-200">
               <pressable 
                  class="flex-row items-center justify-between rounded-lg active:bg-zinc-300 p-2"
                  accessibilityRole="button"
                  (press)="resetData()"   
               >
                  <text class="text-base font-normal text-red-600 dark:text-red-400">Delete all habits</text>
                  <ng-icon name="lucideTrash" size="20" class="text-red-600 dark:text-red-400"/>
               </pressable>
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
   private readonly habitService = inject(HabitsService);
   private readonly dialogs = inject(Dialogs);

   protected async resetData(): Promise<void> {
      const sure = await this.dialogs.confirm( 'Delete all habits', {
         message: 'All your habits and their history will be permanently deleted. This cannot be undone.',
         confirm: 'Delete',
         cancel: 'Cancel',
         destructive: true,
      });
      if ( !sure ) return;
      this.habitService.truncateData();
      await this.dialogs.tell('Done', 'All habits were deleted');
   }
   

}