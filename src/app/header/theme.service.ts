import { computed, effect, inject, Service, signal } from "@angular/core";
import { ColorScheme, Scheme } from "@ng-native/device";
import { Storage } from '@ng-native/expo/async-storage';

type Preference = 'light' | 'dark' | 'system';

@Service()
export class ThemeService {
   private readonly system = inject(ColorScheme);
   private readonly store = inject(Storage);
   private readonly preference = this.store.signal<Preference>('theme', 'system');

   constructor() {
      effect( () => {
         const preference = this.preference();
         this.system.set( preference === 'system' ? null : preference );
      });
   }
   readonly className = computed( () => this.system.current());

   readonly isDark = computed( () => this.className() === 'dark');
   

   choose(preference: Preference): void {
      this.preference.set(preference);
   }
}