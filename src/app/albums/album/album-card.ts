import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { Album } from '../album';

@Component({
  selector: 'app-album-card',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="rounded-lg border border-gray-200 shadow-sm overflow-hidden group hover:shadow-xl transition-shadow duration-300 animate-[fade-in-up_0.4s_ease-out_both]"
    >
      <div class="relative aspect-square overflow-hidden">
        <img
          [ngSrc]="imageUrl()"
          width="400"
          height="400"
          [alt]="subtitle()"
          class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      </div>
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
  protected readonly imageUrl = computed(() => this.album().imageUrl);
}
