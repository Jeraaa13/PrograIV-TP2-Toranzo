import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiempoRelativo',
})
export class TiempoRelativoPipe implements PipeTransform {
  transform(fechaPublicacion: Date): string {
    const fecha = new Date(fechaPublicacion);
    const ahora = new Date();

    const diff = ahora.getTime() - fecha.getTime();

    const segundos = Math.floor(diff / 1000);

    if (segundos < 60) {
      return `hace un momento`;
    } else if (segundos < 3600) {
      const minutos = Math.floor(segundos / 60);
      if (minutos == 1) return `hace 1 minuto`;
      return `hace ${minutos} minutos`;
    } else if (segundos < 86400) {
      const horas = Math.floor(segundos / 60 / 60);
      if (horas == 1) return 'hace 1 hora';
      return `hace ${horas} horas`;
    } else {
      const dias = Math.floor(segundos / 60 / 60 / 24);
      if (dias == 1) return 'hace 1 dia';
      return `hace ${dias} dias`;
    }
  }
}
