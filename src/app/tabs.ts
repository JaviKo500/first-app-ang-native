import { Component } from "@angular/core";
import { NativeHeader, NativeTab, NativeTabsOutlet } from "@ng-native/router";

@Component({
   selector: 'app-tabs',
   imports: [ NativeHeader, NativeTab, NativeTabsOutlet ],
   template: `
      <native-header [hidden]="true"/>
      <native-tabs-outlet>
         <native-tab path="" title="Home" sfSymbol="house"  />
         <native-tab path="settings" title="Settings" sfSymbol="gearshape"  />
      </native-tabs-outlet>
   `,
})

export class Tabs{}