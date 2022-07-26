import { ChangeDetectorRef, Component, ElementRef, Inject, Injector, OnInit, Type, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { DIALOG_COMPONENT } from '../dialog-component-token';
import { DialogHostDirective } from '../dialog-host.directive';
import { WinDialogRef } from '../dialog-ref';

import { WIN_DIALOG_DATA } from '../win-dialog-token';

@Component({
  selector: 'app-win-dialog',
  templateUrl: './win-dialog.component.html',
  styleUrls: ['./win-dialog.component.scss'],
})
export class WinDialogComponent implements OnInit {
  @ViewChild('container') container!: ElementRef;

  @ViewChild(DialogHostDirective)
  dialogHostDirective!: DialogHostDirective;

  constructor(private dialogRef: WinDialogRef,
    private injector: Injector,
    private cd: ChangeDetectorRef,
    @Inject(WIN_DIALOG_DATA) public data: any,
    @Inject(DIALOG_COMPONENT) private component: Type<Component>) {
      console.log(data);
  }

  ngOnInit(): void {
    // this.dialogRef.updateSize({ width: '640px', height: '480px' })
  }

  onClose() {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    this.x = 0 //Number.parseInt(this.container.nativeElement.style.left);
    this.y = 0 // Number.parseInt(this.container.nativeElement.style.top);

    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: WinDialogRef, useValue: this.dialogRef },
        { provide: WIN_DIALOG_DATA, useValue: this.data },
      ],
    });

    const viewContainerRef = this.dialogHostDirective.viewContainerRef;

    viewContainerRef.clear();
    viewContainerRef.createComponent<any>(this.component, {
      injector: injector
    });

    // we need a dialogHostDirective, to avoid a NG0100 we need manualy to trigger detectChanges;
    this.cd.detectChanges();
  }

  private x!: number;
  private y!: number;

  onMouseDown(event: any) {
    let that = this;

    let clientOffsetX = this.x - event.clientX;
    let clientOffsetY = this.y - event.clientY;
    this.setInactive();
    let mousemoveHandler = function (event: any) {
      that.setPosition(Math.floor(event.clientX + clientOffsetX), Math.floor(event.clientY + clientOffsetY));
      event.preventDefault();
    };
    let mouseupHandler = function (event: any) {
      document.body.removeEventListener('mousemove', mousemoveHandler);
      document.body.removeEventListener('mouseup', mouseupHandler);
      event.preventDefault();
      that.container.nativeElement.classList.remove('moving-window');
    };

    document.body.addEventListener('mousemove', mousemoveHandler);
    document.body.addEventListener('mouseup', mouseupHandler);
    event.preventDefault();
  }

  private setPosition(newX: number, newY: number) {
    this.x = newX;
    this.y = newY;
    this.container.nativeElement.style.left = this.x + 'px';
    this.container.nativeElement.style.top = this.y + 'px';
  }

  public setActive(event: any) {
    this.container.nativeElement.classList.remove('inactive-window');
    this.container.nativeElement.classList.add('active-window');
  }

  public setInactive() {
    this.container.nativeElement.classList.add('inactive-window');
    this.container.nativeElement.classList.remove('active-window');
  }
}
