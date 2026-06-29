import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appColorEstado]',
})
export class ColorEstado implements OnChanges {
  @Input() appColorEstado!: boolean;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.appColorEstado) {
      this.el.nativeElement.style.color = '#e74c3c';
    } else {
      this.el.nativeElement.style.color = '#5fb87a';
    }
  }
}
