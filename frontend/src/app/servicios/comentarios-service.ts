import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Comentario } from '../interfaces/comentario';
import { RespuestaComentarios } from '../interfaces/respuesta-comentarios';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  private http = inject(HttpClient);

  crearComentario(idPublicacion: string, mensaje: string) {
    return this.http.post<Comentario>(
      `${environment.apiUrl}/publicaciones/${idPublicacion}/comentarios`,
      {
        mensaje,
      },
    );
  }

  getComentarios(idPublicacion: string, saltar?: number, limite?: number) {
    let params: any = {};
    if (limite) params.limite = limite;
    if (saltar) params.saltar = saltar;

    return this.http.get<RespuestaComentarios>(
      `${environment.apiUrl}/publicaciones/${idPublicacion}/comentarios`,
      { params },
    );
  }

  modificarComentario(idComentario: string, mensaje: string) {
    return this.http.put<Comentario>(`${environment.apiUrl}/comentarios/${idComentario}`, {
      mensaje,
    });
  }
}
