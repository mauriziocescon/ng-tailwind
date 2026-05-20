import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { Album } from '../album';

@Component({
  selector: 'app-album-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rounded border border-gray-200 shadow-sm">
      <div class="p-4">
        <h4 class="text-lg font-semibold">{{ title() }}</h4>
        <h6 class="text-sm text-gray-500 mb-2">{{ subtitle() }}</h6>
      </div>
    </div>
  `,
})
export class AlbumCard {
  readonly album = input.required<Album>();
  protected readonly title = computed(() => this.album().id);
  protected readonly subtitle = computed(() => this.album().title);
}
