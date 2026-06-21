import { Component, input, output } from '@angular/core';
import { Publicacion as PublicacionModel } from '../../interfaces/publicacion';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-publicacion',
  imports: [FormsModule, RouterLink],
  templateUrl: './publicacion.html',
  styleUrl: './publicacion.css',
})
export class Publicacion {
  publicacion = input.required<PublicacionModel>();
  miId = input<string>('');
  darLike = output<PublicacionModel>();
  eliminar = output<PublicacionModel>();

  onLike() {
    this.darLike.emit(this.publicacion());
  }

  onEliminar() {
    this.eliminar.emit(this.publicacion());
  }

  yaDioLike(): boolean {
    return this.publicacion().meGustas.includes(this.miId());
  }
}
