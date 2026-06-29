import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { environment } from '../../environments/environment';
import { RespuestaLogin } from '../interfaces/respuesta-login';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  http = inject(HttpClient);
  router = inject(Router);
  autenticado = signal(false);
  timeoutSesion: any;
  timeoutExpiracion: any;

  constructor() {
    if (this.obtenerToken()) {
      this.autenticado.set(true);
      this.iniciarContador();
    }
  }

  registro(datos: any, imagen: File | null) {
    const formData = new FormData();
    formData.append('nombre', datos.nombre);
    formData.append('apellido', datos.apellido);
    formData.append('correo', datos.correo);
    formData.append('clave', datos.clave);
    formData.append('nombreUsuario', datos.nombreUsuario);
    formData.append('fechaNacimiento', datos.fechaNacimiento.toString());
    if (datos.descripcion) {
      formData.append('descripcion', datos.descripcion);
    }
    if (imagen) {
      formData.append('imagenPerfil', imagen);
    }

    return this.http.post(`${environment.apiUrl}/auth/registro`, formData);
  }

  login(correo: string, clave: string) {
    return this.http.post<RespuestaLogin>(`${environment.apiUrl}/auth/login`, { correo, clave });
  }

  obtenerToken() {
    return localStorage.getItem('token');
  }

  getPerfil() {
    return this.http.get<Usuario>(`${environment.apiUrl}/auth/perfil`);
  }

  autorizar() {
    return this.http.post(`${environment.apiUrl}/auth/autorizar`, {});
  }

  refrescar() {
    return this.http.post<{ access_token: string }>(`${environment.apiUrl}/auth/refrescar`, {});
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
    this.autenticado.set(true);
    this.iniciarContador();
  }

  guardarPerfil(perfil: string) {
    localStorage.setItem('perfil', perfil);
  }

  esAdmin() {
    return localStorage.getItem('perfil') === 'administrador';
  }

  iniciarContador() {
    clearTimeout(this.timeoutSesion);
    clearTimeout(this.timeoutExpiracion);
    this.timeoutSesion = setTimeout(
      () => {
        this.mostrarModalSesion();
      },
      1000 * 60 * 10,
    );

    this.timeoutExpiracion = setTimeout(
      () => {
        Swal.close();
        this.logout();
      },
      1000 * 60 * 15,
    );
  }

  logout() {
    clearTimeout(this.timeoutSesion);
    clearTimeout(this.timeoutExpiracion);
    localStorage.removeItem('token');
    localStorage.removeItem('perfil');
    this.autenticado.set(false);
    this.router.navigateByUrl('/login');
  }

  mostrarModalSesion() {
    Swal.fire({
      title: 'Tu sesión está por expirar',
      text: 'Te quedan 5 minutos. ¿Desea seguir conectado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Seguir conectado',
      cancelButtonText: 'Cerrar sesión',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.refrescar().subscribe((respuesta) => {
          this.guardarToken(respuesta.access_token);
        });
      } else {
        this.logout();
      }
    });
  }
}
