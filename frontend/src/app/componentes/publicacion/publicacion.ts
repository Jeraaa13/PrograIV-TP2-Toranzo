import { Component, inject, input, output } from '@angular/core';
import { Publicacion as PublicacionModel } from '../../interfaces/publicacion';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Auth } from '../../servicios/auth';
import { Resaltar } from '../../directivas/resaltar';
import { TruncarPipe } from '../../pipes/truncar-pipe';
import { CantidadPipe } from '../../pipes/cantidad-pipe';

@Component({
  selector: 'app-publicacion',
  imports: [FormsModule, RouterLink, Resaltar, TruncarPipe, CantidadPipe],
  templateUrl: './publicacion.html',
  styleUrl: './publicacion.css',
})
export class Publicacion {
  auth = inject(Auth);
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
