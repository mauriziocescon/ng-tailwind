import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavigationBar } from './shared/navigation-bar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavigationBar,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-navigation-bar />
    <div class="main-view min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <router-outlet />
    </div>
  `,
  styles: `
    .main-view {
      padding-top: 4.25rem;
    }
  `,
})
export class App {
}
