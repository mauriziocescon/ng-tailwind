import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

export interface ModalConfirmerData {
  title: string;
  message: string;
  yesButtonLabel: string;
  noButtonLabel: string;
}

@Component({
  selector: 'app-modal-confirmer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
      <h4 class="text-lg font-bold text-gray-900 dark:text-gray-100">{{ data.title }}</h4>
      <button
        type="button"
        class="size-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
        aria-label="Close"
        (click)="dismiss()">
        <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="p-5">
      <p class="text-gray-600 dark:text-gray-300">{{ data.message }}</p>
    </div>
    <div class="flex justify-end gap-3 p-5 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900">
      <button
        type="button"
        class="px-5 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
        (click)="no()">
        {{ data.noButtonLabel }}
      </button>
      <button
        type="button"
        class="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
        (click)="yes()">
        {{ data.yesButtonLabel }}
      </button>
    </div>
  `,
  host: {
    class: 'block bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-black/30 w-full max-w-md overflow-hidden',
  },
})
export class ModalConfirmer {
  private readonly dialogRef = inject(DialogRef<boolean | undefined>);
  protected readonly data: ModalConfirmerData = inject(DIALOG_DATA);

  yes() {
    this.dialogRef.close(true);
  }

  no() {
    this.dialogRef.close(false);
  }

  dismiss() {
    this.dialogRef.close(undefined);
  }
}
