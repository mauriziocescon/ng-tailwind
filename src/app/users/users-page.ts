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
    <div class="px-4 pt-2.5">

      <div>
        <app-text-filter (valueDidChange)="textSearchDidChange($event)" />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        @for (user of usersStore.users(); track user.id) {
          <app-user-card [user]="user" />
        }
      </div>
      
      @if (usersStore.loading()) {
        <div class="full-width-message">{{ "USERS.LOADING" | transloco }}</div>
      } @else if (usersStore.hasNoData()) {
        <div class="full-width-message">{{ "USERS.NO_RESULT" | transloco }}</div>
      } @else if (usersStore.isLoadCompleted()) {
        <div class="full-width-message">{{ "USERS.LOAD_COMPLETED" | transloco }}</div>
      } @else if (usersStore.shouldRetry()) {
        <div class="full-width-message cursor-pointer" (click)="retry()">{{ "USERS.RETRY" | transloco }}</div>
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
