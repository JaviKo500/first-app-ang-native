import { Routes } from '@angular/router';
import { Tabs } from './tabs';
import { Home } from './home/home';
import { Setting } from './settings/settings';

export const routes: Routes = [
   {
      path: '',
      // loadComponent: () => import('./tabs').then( ( m ) => m.Tabs ),
      component: Tabs,
      children: [
         {
            path: '',
            // loadComponent: () => import('./home/home').then( ( m ) => m.Home ),
            component: Home,
         },
         {
            path: 'settings',
            // loadComponent: () => import('./settings/settings').then( ( m ) => m.Setting ),
            component: Setting,

         },
      ]
   },
];