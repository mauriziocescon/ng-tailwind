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
    <div class="flex shadow-sm rounded-xl overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all duration-200">
      <input
        type="text"
        class="flex-1 px-4 py-2.5 border-0 focus:outline-none text-gray-700 placeholder-gray-400"
        placeholder="{{ 'TEXT_FILTER.PLACEHOLDER' | transloco }}"
        [(ngModel)]="value"
        (ngModelChange)="valueChange()">
      <span
        class="flex items-center px-4 bg-gray-50 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 cursor-pointer transition-colors duration-200"
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
