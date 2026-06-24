import { ChangeDetectionStrategy, Component, effect, inject, OnInit, untracked } from '@angular/core';

import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

import { ScrollToTop } from '../shared/scroll-to-top';
import { TextFilter } from '../shared/text-filter';
import { ModalManager } from '../shared/modal-manager';

import { AlbumCard } from './album/album-card';

import { AlbumsStore } from './albums-store';

@Component({
  selector: 'app-albums-page',
  imports: [
    TranslocoPipe,
    InfiniteScrollDirective,
    ScrollToTop,
    TextFilter,
    AlbumCard,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="max-w-7xl mx-auto px-6 pt-4 pb-8"
      infiniteScroll
      [infiniteScrollDisabled]="albumsStore.isInfiniteScrollDisabled()"
      (scrolled)="updateParams()">

      <div>
        <app-text-filter (valueDidChange)="textSearchDidChange($event)" />
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        @for (album of albumsStore.albums(); track album.id) {
          <app-album-card [album]="album" />
        }
      </div>

      @if (albumsStore.isLoading()) {
        <div class="flex items-center justify-center py-12 text-indigo-600 dark:text-indigo-400">
          <svg class="animate-spin size-6 mr-3" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          <span class="text-lg font-medium">{{ "ALBUMS.LOADING" | transloco }}</span>
        </div>
      } @else if (albumsStore.hasNoData()) {
        <div class="text-center py-12 text-gray-400 text-lg">{{ "ALBUMS.NO_RESULT" | transloco }}</div>
      } @else if (albumsStore.isLoadCompleted()) {
        <div class="text-center py-8 text-gray-400 text-sm font-medium uppercase tracking-wide">{{ "ALBUMS.LOAD_COMPLETED" | transloco }}</div>
      } @else if (albumsStore.shouldRetry()) {
        <div class="text-center py-8">
          <button class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200" (click)="retry()">{{ "ALBUMS.RETRY" | transloco }}</button>
        </div>
      }
      <app-scroll-to-top />
    </div>
  `,
})
export class AlbumsPage implements OnInit {
  private readonly transloco = inject(TranslocoService);
  private readonly modalManager = inject(ModalManager);
  protected readonly albumsStore = inject(AlbumsStore);

  private readonly errorWatcher = effect(() => {
    this.albumsStore.error();
    untracked(() => this.showModalError());
  });

  ngOnInit() {
    this.textSearchDidChange('');
  }

  protected textSearchDidChange(textSearch: string) {
    this.albumsStore.updateParams({ textSearch, pageNumber: 1 });
  }

  protected updateParams() {
    if (!this.albumsStore.isLoadCompleted() && !this.albumsStore.isLoading()) {
      if (this.albumsStore.error()) {
        this.albumsStore.updateParams({ ...this.albumsStore.params() });
      } else {
        this.albumsStore.updateParams({
          ...this.albumsStore.params(),
          pageNumber: this.albumsStore.params().pageNumber + 1,
        });
      }
    }
  }

  protected retry() {
    this.albumsStore.retry();
  }

  private showModalError() {
    if (this.albumsStore.error()) {
      this.modalManager.alert(
        this.transloco.translate('ALBUMS.ERROR_ACCESS_DATA'),
        this.albumsStore.error() as string,
        this.transloco.translate('ALBUMS.CLOSE'),
      );
    }
  }
}
