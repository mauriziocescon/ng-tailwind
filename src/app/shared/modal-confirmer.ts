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
    <div class="flex items-center justify-between p-4 border-b border-gray-200">
      <h4 class="text-lg font-semibold">{{ data.title }}</h4>
      <button
        type="button"
        class="text-gray-400 hover:text-gray-600 text-2xl leading-none"
        aria-label="Close"
        (click)="dismiss()">×
      </button>
    </div>
    <div class="p-4">
      <p>{{ data.message }}</p>
    </div>
    <div class="flex justify-end gap-2 p-4 border-t border-gray-200">
      <button
        type="button"
        class="px-4 py-2 bg-[var(--primary-color)] text-white rounded hover:opacity-90"
        (click)="yes()">
        {{ data.yesButtonLabel }}
      </button>
      <button
        type="button"
        class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        (click)="no()">
        {{ data.noButtonLabel }}
      </button>
    </div>
  `,
  host: {
    class: 'block bg-white rounded-lg shadow-xl w-full max-w-md',
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
