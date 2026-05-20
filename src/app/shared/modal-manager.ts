import { inject, Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { first } from 'rxjs/operators';

import { ModalAlert, ModalAlertData } from './modal-alert';
import { ModalConfirmer, ModalConfirmerData } from './modal-confirmer';

@Injectable({
  providedIn: 'root',
})
export class ModalManager {
  private readonly dialog = inject(Dialog);

  alert(title: string, message: string, buttonLabel: string) {
    return this.dialog.open<string>(ModalAlert, {
      data: { title, message, buttonLabel } satisfies ModalAlertData,
      backdropClass: 'bg-black/50',
      panelClass: ['flex', 'items-center', 'justify-center', 'p-4'],
    });
  }

  confirmer(title: string, message: string, yesButtonLabel: string, noButtonLabel: string, callback: (result: boolean) => void) {
    return this.dialog.open<boolean | undefined>(ModalConfirmer, {
      data: { title, message, yesButtonLabel, noButtonLabel } satisfies ModalConfirmerData,
      backdropClass: 'bg-black/50',
      panelClass: ['flex', 'items-center', 'justify-center', 'p-4'],
    })
      .closed
      .pipe(first())
      .subscribe(result => {
        if (result !== undefined) {
          callback(result);
        }
      });
  }
}
