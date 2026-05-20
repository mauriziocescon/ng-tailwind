import { ChangeDetectionStrategy, Component, computed, OnDestroy, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import isEmpty from 'lodash/isEmpty';

import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-text-filter',
  imports: [
    FormsModule,
    TranslocoPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex">
      <input
        type="text"
        class="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
        placeholder="{{ 'TEXT_FILTER.PLACEHOLDER' | transloco }}"
        [(ngModel)]="value"
        (ngModelChange)="valueChange()">
      <span
        class="flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r bg-gray-50 text-[var(--primary-color)] cursor-pointer"
        (click)="resetTextFilter()">
        @if (!isNotEmpty()) {
          <svg
            class="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        } @else {
          <svg
            class="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        }
      </span>
    </div>
  `,
})
export class TextFilter implements OnDestroy {
  readonly valueDidChange = output<string>();

  protected readonly value = signal('');
  protected readonly isNotEmpty = computed(() => !isEmpty(this.value()));
  protected timeoutRef: number | undefined = undefined;

  ngOnDestroy() {
    clearTimeout(this.timeoutRef);
  }

  valueChange() {
    clearTimeout(this.timeoutRef);

    this.timeoutRef = setTimeout(() => {
      this.valueDidChange.emit(this.value());
    }, 500);
  }

  resetTextFilter() {
    this.value.set('');
    this.valueDidChange.emit(this.value());
  }
}
