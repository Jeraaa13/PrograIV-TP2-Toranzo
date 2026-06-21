import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { publicacionesService } from '../../servicios/publicaciones-service';
import { Publicacion } from '../../interfaces/publicacion';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Auth } from '../../servicios/auth';
import { Publicacion as PublicacionComponent } from '../publicacion/publicacion';

@Component({
  selector: 'app-publicaciones',
  imports: [FormsModule, PublicacionComponent],
  templateUrl: './publicaciones.html',
  styleUrl: './publicaciones.css',
})
export class Publicaciones implements OnInit {
  @ViewChild('inputFile') inputFile!: ElementRef;
  publicaciones = signal<Publicacion[]>([]);
  auth = inject(Auth);
  publicacionesService = inject(publicacionesService);
  titulo = '';
  descripcion = '';
  archivoSeleccionado: File | null = null;
  miId = '';
  ordenActual = 'fechaPublicacion';
  pagina = 0;
  limite = 5;
  total = 0;
  enviando = false;

  ngOnInit() {
    this.cargarUsuario();
    this.cargarPublicaciones();
  }

  cargarPublicaciones() {
    const saltar = this.pagina * this.limite;
    this.publicacionesService
      .getPublicaciones(undefined, this.limite, this.ordenActual, saltar)
      .subscribe((respuesta) => {
        this.publicaciones.set(respuesta.publicaciones);
        this.total = respuesta.total;
      });
  }

  paginaSiguiente() {
    this.pagina++;
    this.cargarPublicaciones();
  }

  paginaAnterior() {
    if (this.pagina > 0) {
      this.pagina--;
      this.cargarPublicaciones();
    }
  }

  cargarUsuario() {
    this.auth.getPerfil().subscribe((usuario) => {
      this.miId = usuario._id;
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.archivoSeleccionado = input.files?.[0] ?? null;
  }

  crear() {
    if (this.enviando) return;
    this.enviando = true;
    this.publicacionesService
      .crearPublicacion(this.titulo, this.descripcion, this.archivoSeleccionado)
      .subscribe({
        next: () => {
          this.cargarPublicaciones();
          this.enviando = false;
          this.titulo = '';
          this.descripcion = '';
          this.archivoSeleccionado = null;
          this.inputFile.nativeElement.value = '';
        },
        error: (err) => {
          this.enviando = false;
          Swal.fire({
            title: 'Error',
            text: err.error?.message,
            icon: 'warning',
          });
        },
      });
  }

  toggleLike(pub: Publicacion) {
    if (pub.meGustas.includes(this.miId)) {
      this.publicacionesService.quitarLike(pub._id).subscribe(() => this.cargarPublicaciones());
    } else {
      this.publicacionesService.darLike(pub._id).subscribe(() => this.cargarPublicaciones());
    }
  }

  eliminar(pub: Publicacion) {
    Swal.fire({
      title: '¿Eliminar publicacion?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.publicacionesService.eliminarPublicacion(pub._id).subscribe(() => {
          this.cargarPublicaciones();
          Swal.fire('Eliminada', 'La publicación fue eliminada', 'success');
        });
      }
    });
  }

  cambiarOrden() {
    this.cargarPublicaciones();
  }
}
