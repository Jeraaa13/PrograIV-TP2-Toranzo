import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cantidad',
})
export class CantidadPipe implements PipeTransform {
  transform(numero: number, singular: string, plural: string): string {
    if (numero === 1) {
      return `1 ${singular}`;
    } else {
      return `${numero} ${plural}`;
    }
  }
}
