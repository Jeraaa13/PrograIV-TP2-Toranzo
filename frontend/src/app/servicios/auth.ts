import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { environment } from '../../environments/environment';
import { RespuestaLogin } from '../interfaces/respuesta-login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  http = inject(HttpClient);
  router = inject(Router);
  autenticado = signal(false);

  constructor() {
    if (this.obtenerToken()) {
      this.autenticado.set(true);
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

  guardarToken(token: string) {
    localStorage.setItem('token', token);
    this.autenticado.set(true);
  }

  obtenerToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.autenticado.set(false);
    this.router.navigateByUrl('/login');
  }

  getPerfil() {
    return this.http.get<Usuario>(`${environment.apiUrl}/auth/perfil`);
  }
}
