import { Component, inject } from '@angular/core';
import { SafeAreaProvider } from '@ng-native/components';
import { ThemeService } from './header/theme.service';
import { Home } from './home/home';
import { NativeStackOutlet } from '@ng-native/router';

@Component({
  imports: [NativeStackOutlet, SafeAreaProvider],
  selector: 'app-root',
  template: `
    <safe-area-provider>
      <native-stack-outlet />
    </safe-area-provider>
  `,
  host: {
    style: 'flex: 1',
    '[class.dark]': 'theme.isDark()',
  }
})
export class App {
  protected readonly theme = inject(ThemeService);
}
