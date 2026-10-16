import { Component, inject } from '@angular/core';
import { SafeAreaProvider } from '@ng-native/components';
import { ThemeService } from './header/theme.service';
import { Home } from './home/home';

@Component({
  imports: [Home, SafeAreaProvider],
  selector: 'app-root',
  template: `
    <safe-area-provider>
      <home-app />
    </safe-area-provider>
  `,
  host: {
    ['class.dark']: 'theme.isDark()',
  }
})
export class App {
  protected readonly theme = inject(ThemeService);
}
