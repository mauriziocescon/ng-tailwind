import { Component, computed, linkedSignal, output } from '@angular/core';
import { debounce, form, FormField } from '@angular/forms/signals';

import isEmpty from 'lodash/isEmpty';

import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-text-filter',
  imports: [FormField, TranslocoPipe],
  template: `
    <div
      class="flex shadow-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all duration-200"
    >
      <input
        type="text"
        class="flex-1 px-4 py-2.5 border-0 focus:outline-none text-gray-700 dark:text-gray-200 dark:bg-gray-800 placeholder-gray-400"
        placeholder="{{ 'TEXT_FILTER.PLACEHOLDER' | transloco }}"
        [formField]="form.value"
      />
      <span
        class="flex items-center px-4 bg-gray-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
        (click)="resetTextFilter()"
      >
        @if (!isNotEmpty()) {
          <svg
            class="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        } @else {
          <svg
            class="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        }
      </span>
    </div>
  `,
})
export class TextFilter {
  readonly valueDidChange = output<string>();

  private readonly filter = linkedSignal(() => ({ value: '' }), {
    set: (newValue, rawSet) => {
      rawSet(newValue);
      this.valueDidChange.emit(newValue.value);
    },
  });

  protected readonly form = form(this.filter, (schemaPath) => {
    debounce(schemaPath.value, 500);
  });

  protected readonly isNotEmpty = computed(() => !isEmpty(this.filter().value));

  resetTextFilter() {
    this.filter.set({ value: '' });
  }
}
