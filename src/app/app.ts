import { ChangeDetectionStrategy, Component, computed, Input, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NavigationBar } from './shared/navigation-bar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavigationBar,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-navigation-bar/>
    <router-outlet/>`,
})
export class App {
  @Input('dadsa') name = signal('Angular');
  readonly upperName = computed(() => this.name().toUpperCase());

  test() {
    console.log('ciao');
  }
}
