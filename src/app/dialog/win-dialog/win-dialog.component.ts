import { Component, ElementRef, Inject, Injector, OnInit, Type, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { DIALOG_COMPONENT } from '../dialog-component-token';
import { DialogHostDirective } from '../dialog-host.directive';
import { DialogRef } from '../dialog-ref';
import { DIALOG_DATA } from '../dialog-token';

@Component({
  selector: 'app-win-dialog',
  templateUrl: './win-dialog.component.html',
  styleUrls: ['./win-dialog.component.scss'],

})
export class WinDialogComponent implements OnInit {
  @ViewChild('container') container!: ElementRef;

  @ViewChild(DialogHostDirective)
  dialogHostDirective!: DialogHostDirective;

  constructor(private dialogRef: DialogRef,
    private injector: Injector,
    @Inject(DIALOG_DATA) public data: any,
    @Inject(DIALOG_COMPONENT) private component: Type<Component>) {
  }

  ngOnInit(): void {
    this.dialogRef.updateSize({ width: '283px', height: '283px' })
  }

  onClose() {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    this.x = Number.parseInt(this.container.nativeElement.style.left);
    this.y = Number.parseInt(this.container.nativeElement.style.top);

    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: DialogRef, useValue: this.dialogRef },
        { provide: DIALOG_DATA, useValue: this.data },
      ],
    });

    const viewContainerRef = this.dialogHostDirective.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent<Component>(this.component, {
      injector: injector
    });
  }

  private x!: number;
  private y!: number;

  onMouseDown(event: any) {
    let that = this;

    var clientOffsetX = this.x - event.clientX;
    var clientOffsetY = this.y - event.clientY;
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
