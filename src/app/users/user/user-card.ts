import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { User } from '../user';

@Component({
  selector: 'app-user-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm dark:shadow-none dark:ring-1 dark:ring-white/5 hover:shadow-xl dark:hover:shadow-xl dark:hover:shadow-black/20 transition-all duration-300 overflow-hidden group animate-[fade-in-up_0.4s_ease-out_both]">
      <div class="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      <div class="p-5">
        <div class="flex items-center gap-3 mb-3">
          <div class="size-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
            {{ initials() }}
          </div>
          <div>
            <h4 class="text-base font-semibold text-gray-900 dark:text-gray-100">{{ subtitle() }}</h4>
            <p class="text-xs text-gray-400">#{{ title() }}</p>
          </div>
        </div>
        <div class="space-y-1.5 text-sm text-gray-600 dark:text-gray-300">
          <p class="flex items-center gap-2">
            <svg class="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg>
            {{ email() }}
          </p>
          <p class="flex items-center gap-2">
            <svg class="size-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"/></svg>
            {{ website() }}
          </p>
        </div>
      </div>
    </div>
  `,
})
export class UserCard {
  readonly user = input.required<User>();
  protected readonly title = computed(() => this.user().id);
  protected readonly subtitle = computed(() => this.user().username);
  protected readonly email = computed(() => this.user().email);
  protected readonly website = computed(() => this.user().website);
  protected readonly initials = computed(() => this.user().name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase());
}
