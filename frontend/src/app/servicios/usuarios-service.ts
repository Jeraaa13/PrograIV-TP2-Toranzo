import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private http = inject(HttpClient);

  getUsuarios() {
    return this.http.get<Usuario[]>(`${environment.apiUrl}/usuarios`);
  }

  crearUsuario(usuario: any, archivo: File | undefined) {
    const formData = new FormData();
    formData.append('nombre', usuario.nombre);
    formData.append('apellido', usuario.apellido);
    formData.append('correo', usuario.correo);
    formData.append('clave', usuario.clave);
    formData.append('nombreUsuario', usuario.nombreUsuario);
    formData.append('perfil', usuario.perfil);
    formData.append('fechaNacimiento', usuario.fechaNacimiento.toString());
    if (usuario.descripcion) {
      formData.append('descripcion', usuario.descripcion);
    }
    if (archivo) {
      formData.append('imagenPerfil', archivo);
    }
    return this.http.post(`${environment.apiUrl}/usuarios`, formData);
  }

  deshabilitarUsuario(id: string) {
    return this.http.delete<Usuario>(`${environment.apiUrl}/usuarios/${id}`);
  }

  activarUsuario(id: string) {
    return this.http.post<Usuario>(`${environment.apiUrl}/usuarios/${id}/activar`, {});
  }
}
