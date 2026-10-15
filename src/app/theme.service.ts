import { computed, inject, Service, signal } from "@angular/core";
import { ColorScheme, Scheme } from "@ng-native/device";

type Preference = 'light' | 'dark' | 'system';

@Service()
export class ThemeService {
   private readonly system = inject(ColorScheme);
   private readonly preference = signal<Preference>('system');

   readonly className = computed( () => {
      const choose = this.preference() === 'system' ? this.system.current() : this.preference();
      return choose === 'dark' ? 'dark' : 'light';
   });

   readonly isDark = computed( () => this.className() === 'dark');
   

   choose(preference: Preference): void {
      this.preference.set(preference);
      this.system.set(preference as Scheme);
   }
}