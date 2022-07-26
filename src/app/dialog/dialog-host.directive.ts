import { Directive, Input, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDialogHost]'
})
export class DialogHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }

}
