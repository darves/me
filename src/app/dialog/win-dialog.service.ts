import { Dialog } from '@angular/cdk/dialog';
import { Overlay, ComponentType } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { DIALOG_COMPONENT } from './dialog-component-token';
import { WinDialogRef } from './dialog-ref';

import { WIN_DIALOG_DATA } from './win-dialog-token';
import { WinDialogComponent } from './win-dialog/win-dialog.component';

export interface DialogConfig {
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class WinDialogService {
  constructor(private overlay: Overlay, private injector: Injector, public dialog: Dialog) {}

  /**
   * Open a custom component in an overlay
   */
  open<T>(component: ComponentType<T>, config?: DialogConfig): WinDialogRef {
    // this.dialog.open
    // Globally centered position strategy
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    // Create the overlay with customizable options
    const overlayRef = this.overlay.create({
      positionStrategy: positionStrategy,
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      panelClass: 'overlay-panel',
      width: '100%',
      height: '100%'
    });

    // Create dialogRef to return
    const dialogRef = new WinDialogRef(overlayRef);

    // Create injector to be able to reference the DialogRef from within the component
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: WinDialogRef, useValue: dialogRef },
        { provide: WIN_DIALOG_DATA, useValue: config?.data },
        { provide: DIALOG_COMPONENT, useValue: component },
      ],
    });

    // Attach component portal to the overlay
    const portal = new ComponentPortal(WinDialogComponent, null, injector);
    overlayRef.attach(portal);

    return dialogRef;
  }
}
