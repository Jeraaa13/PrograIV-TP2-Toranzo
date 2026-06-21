import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Publicacion } from '../../interfaces/publicacion';
import { Comentario } from '../../interfaces/comentario';
import { publicacionesService } from '../../servicios/publicaciones-service';
import { ComentariosService } from '../../servicios/comentarios-service';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../servicios/auth';

@Component({
  selector: 'app-publicacion-detalle',
  imports: [FormsModule, RouterLink],
  templateUrl: './publicacion-detalle.html',
  styleUrl: './publicacion-detalle.css',
})
export class PublicacionDetalle implements OnInit {
  private route = inject(ActivatedRoute);
  private publicacionesService = inject(publicacionesService);
  private comentariosService = inject(ComentariosService);
  private auth = inject(Auth);
  idPublicacion = '';
  publicacion = signal<Publicacion | null>(null);
  comentarios = signal<Comentario[]>([]);
  nuevoComentario = '';
  enviando = false;
  saltarComentarios = 0;
  limiteComentarios = 5;
  total = 0;
  miId = '';
  editandoId = '';
  textoEditado = '';
  textoOriginal = '';

  ngOnInit(): void {
    this.idPublicacion = this.route.snapshot.paramMap.get('id') ?? '';

    this.publicacionesService.getPublicacion(this.idPublicacion).subscribe((pub) => {
      this.publicacion.set(pub);
    });

    this.cargarComentarios();

    this.auth.getPerfil().subscribe((usuario) => {
      this.miId = usuario._id;
    });
  }

  cargarComentarios() {
    this.comentariosService
      .getComentarios(this.idPublicacion, this.saltarComentarios, this.limiteComentarios)
      .subscribe((respuesta) => {
        this.comentarios.update((actuales) => [...actuales, ...respuesta.comentarios]);
        this.total = respuesta.total;
      });
  }

  cargarMas() {
    this.saltarComentarios += this.limiteComentarios;
    this.cargarComentarios();
  }

  comentar() {
    if (this.enviando) return;
    this.enviando = true;
    this.comentariosService.crearComentario(this.idPublicacion, this.nuevoComentario).subscribe({
      next: () => {
        this.nuevoComentario = '';
        this.saltarComentarios = 0;
        this.comentarios.set([]);
        this.cargarComentarios();
        this.enviando = false;
      },
      error: () => {
        this.enviando = false;
      },
    });
  }

  empezarEdicion(com: Comentario) {
    this.editandoId = com._id;
    this.textoEditado = com.mensaje;
    this.textoOriginal = com.mensaje;
  }

  guardarEdicion() {
    this.comentariosService
      .modificarComentario(this.editandoId, this.textoEditado)
      .subscribe(() => {
        this.editandoId = '';
        this.saltarComentarios = 0;
        this.comentarios.set([]);
        this.cargarComentarios();
      });
  }

  cancelarEdicion() {
    this.editandoId = '';
    this.textoEditado = '';
  }
}
