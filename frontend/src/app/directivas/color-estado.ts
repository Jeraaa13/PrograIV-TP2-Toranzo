import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appColorEstado]',
})
export class ColorEstado implements OnInit {
  @Input() appColorEstado!: boolean;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.appColorEstado) {
      this.el.nativeElement.style.color = '#e74c3c';
    } else {
      this.el.nativeElement.style.color = '#5fb87a';
    }
  }
}
