import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

export interface ModalAlertData {
  title: string;
  message: string;
  buttonLabel: string;
}

@Component({
  selector: 'app-modal-alert',
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
    <div class="flex justify-end p-4 border-t border-gray-200">
      <button
        type="button"
        class="px-4 py-2 bg-[var(--primary-color)] text-white rounded hover:opacity-90"
        (click)="close()">
        {{ data.buttonLabel }}
      </button>
    </div>
  `,
  host: {
    class: 'block bg-white rounded-lg shadow-xl w-full max-w-md',
  },
})
export class ModalAlert {
  private readonly dialogRef = inject(DialogRef<string>);
  protected readonly data: ModalAlertData = inject(DIALOG_DATA);

  close() {
    this.dialogRef.close('Close click');
  }

  dismiss() {
    this.dialogRef.close();
  }
}
