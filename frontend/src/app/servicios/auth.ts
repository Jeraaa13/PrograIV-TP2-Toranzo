import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  http = inject(HttpClient);

  registro(usuario: Usuario) {
    return this.http.post(`${environment.apiUrl}/auth/registro`, usuario);
  }

  login(correo: string, clave: string) {
    return this.http.post(`${environment.apiUrl}/auth/login`, { correo, clave });
  }
}
