import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncar',
})
export class TruncarPipe implements PipeTransform {
  transform(texto: string, limite: number = 100) {
    if (!texto) return '';
    if (texto.length <= limite) return texto;
    return texto.substring(0, limite) + '...';
  }
}
