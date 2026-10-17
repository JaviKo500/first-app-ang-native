import { Component } from "@angular/core";
import { NativeHeader, NativeTab, NativeTabsOutlet } from "@ng-native/router";
import { lucideHouse, lucideSettings } from '@ng-icons/lucide';

@Component({
   selector: 'app-tabs',
   imports: [NativeHeader, NativeTab, NativeTabsOutlet,],
   template: `
      <native-header [hidden]="true"/>
      <native-tabs-outlet class="dark:bg-black bg-zinc-100">
         <native-tab path="" title="Home" [icon]="{ svg: house } "  />
         <native-tab path="settings" title="Settings" [icon]="{ svg: settings }"  />
      </native-tabs-outlet>
   `,
})

export class Tabs{

   protected readonly house = lucideHouse;
   protected readonly settings = lucideSettings;

}