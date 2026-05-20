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
    <div class="flex items-center justify-between p-5 border-b border-gray-100">
      <h4 class="text-lg font-bold text-gray-900">{{ data.title }}</h4>
      <button
        type="button"
        class="size-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-150"
        aria-label="Close"
        (click)="dismiss()">
        <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="p-5">
      <p class="text-gray-600">{{ data.message }}</p>
    </div>
    <div class="flex justify-end p-5 border-t border-gray-100 bg-gray-50/50">
      <button
        type="button"
        class="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
        (click)="close()">
        {{ data.buttonLabel }}
      </button>
    </div>
  `,
  host: {
    class: 'block bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden',
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
