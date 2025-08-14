import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-modal-confirmer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ title() }}</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="dismiss()"></button>
    </div>
    <div class="modal-body">
      <p>{{ message() }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="yes()">{{ yesButtonLabel() }}</button>
      <button type="button" class="btn btn-default" (click)="no()">{{ noButtonLabel() }}</button>
    </div>`,
})
export class ModalConfirmer {
  readonly title = signal<string | undefined>(undefined);
  readonly message = signal<string | undefined>(undefined);
  readonly yesButtonLabel = signal<string | undefined>(undefined);
  readonly noButtonLabel = signal<string | undefined>(undefined);

  yes() {
  }

  no() {
  }

  dismiss() {
  }
}
