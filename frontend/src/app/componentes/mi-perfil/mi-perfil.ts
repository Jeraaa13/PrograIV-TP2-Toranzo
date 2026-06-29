import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../servicios/auth';
import { Usuario } from '../../interfaces/usuario';
import { publicacionesService } from '../../servicios/publicaciones-service';
import { Publicacion } from '../../interfaces/publicacion';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mi-perfil',
  imports: [DatePipe, RouterLink],
  templateUrl: './mi-perfil.html',
  styleUrl: './mi-perfil.css',
})
export class MiPerfil implements OnInit {
  auth = inject(Auth);
  publicacionesService = inject(publicacionesService);
  usuario = signal<Usuario | null>(null);
  misPublicaciones = signal<Publicacion[]>([]);

  ngOnInit() {
    this.auth.getPerfil().subscribe((usuario) => {
      this.usuario.set(usuario);
      this.publicacionesService.getPublicaciones(usuario._id, 3).subscribe((respuesta) => {
        this.misPublicaciones.set(respuesta.publicaciones);
      });
    });
  }
}
