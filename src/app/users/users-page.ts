import { ChangeDetectionStrategy, Component, effect, inject, OnInit, untracked } from '@angular/core';

import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

import { ScrollToTop } from '../shared/scroll-to-top';
import { TextFilter } from '../shared/text-filter';
import { ModalManager } from '../shared/modal-manager';

import { UserCard } from './user/user-card';

import { UsersStore } from './users-store';

@Component({
  selector: 'app-users-page',
  imports: [
    TranslocoPipe,
    ScrollToTop,
    TextFilter,
    UserCard,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-7xl mx-auto px-6 pt-4 pb-8">

      <div>
        <app-text-filter (valueDidChange)="textSearchDidChange($event)" />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        @for (user of usersStore.users(); track user.id) {
          <app-user-card [user]="user" />
        }
      </div>
      
      @if (usersStore.loading()) {
        <div class="flex items-center justify-center py-12 text-indigo-600 dark:text-indigo-400">
          <svg class="animate-spin size-6 mr-3" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          <span class="text-lg font-medium">{{ "USERS.LOADING" | transloco }}</span>
        </div>
      } @else if (usersStore.hasNoData()) {
        <div class="text-center py-12 text-gray-400 text-lg">{{ "USERS.NO_RESULT" | transloco }}</div>
      } @else if (usersStore.isLoadCompleted()) {
        <div class="text-center py-8 text-gray-400 text-sm font-medium uppercase tracking-wide">{{ "USERS.LOAD_COMPLETED" | transloco }}</div>
      } @else if (usersStore.shouldRetry()) {
        <div class="text-center py-8">
          <button class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200" (click)="retry()">{{ "USERS.RETRY" | transloco }}</button>
        </div>
      }
      <app-scroll-to-top />
    </div>
  `,
})
export class UsersPage implements OnInit {
  private readonly transloco = inject(TranslocoService);
  private readonly modalManager = inject(ModalManager);
  protected readonly usersStore = inject(UsersStore);

  private readonly errorWatcher = effect(() => {
    this.usersStore.error();
    untracked(() => this.showModalError());
  });

  ngOnInit() {
    this.textSearchDidChange('');
  }

  protected textSearchDidChange(textSearch: string) {
    this.usersStore.updateParams({ textSearch });
  }

  protected retry() {
    this.usersStore.retry();
  }

  private showModalError() {
    if (this.usersStore.error()) {
      this.modalManager.alert(
        this.transloco.translate('USERS.ERROR_ACCESS_DATA'),
        this.usersStore.error()?.message as string,
        this.transloco.translate('USERS.CLOSE'),
      );
    }
  }
}
