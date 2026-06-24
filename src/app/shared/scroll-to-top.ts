import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  NgZone,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-scroll-to-top',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed bottom-4 right-4 z-50 cursor-pointer text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 opacity-70 hover:opacity-100 transition-all duration-200 hover:scale-110" (click)="scrollToTop()">
      <svg class="size-12 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
      </svg>
    </div>
  `,
  styles: ``,
})
export class ScrollToTop implements OnDestroy {
  private readonly zone = inject(NgZone);
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);

  private sub: Subscription | undefined = undefined;

  private readonly domReady = afterNextRender(() => {
    this.manageVisibility();

    this.sub = this.zone.runOutsideAngular(() =>
      fromEvent(window, 'scroll')
        .pipe(debounceTime(250))
        .subscribe(() => this.zone.run(() => this.manageVisibility())),
    );
  });

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  scrollToTop() {
    this.document.documentElement.scrollTop = 0;
  }

  private manageVisibility() {
    const scrollTopHeight = this.document.documentElement.scrollTop || 0;
    if (scrollTopHeight > 100) {
      this.renderer.setStyle(this.el.nativeElement, 'visibility', 'visible');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'visibility', 'hidden');
    }
  }
}
