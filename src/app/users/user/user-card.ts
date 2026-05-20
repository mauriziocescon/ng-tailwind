import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { User } from '../user';

@Component({
  selector: 'app-user-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rounded border border-gray-200 shadow-sm">
      <div class="p-4">
        <h4 class="text-lg font-semibold">{{ title() }}</h4>
        <h6 class="text-sm text-gray-500 mb-2">{{ subtitle() }}</h6>
        <p class="text-sm text-gray-700">{{ content() }}</p>
      </div>
    </div>
  `,
})
export class UserCard {
  readonly user = input.required<User>();
  protected readonly title = computed(() => this.user().id);
  protected readonly subtitle = computed(() => this.user().username);
  protected readonly content = computed(() => `${this.user().email} - ${this.user().website}`);
}
