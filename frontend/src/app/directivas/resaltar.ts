import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appResaltar]',
})
export class Resaltar {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  alEntrar() {
    this.el.nativeElement.style.backgroundColor = '#3a2020';
  }

  @HostListener('mouseleave')
  alSalir() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
