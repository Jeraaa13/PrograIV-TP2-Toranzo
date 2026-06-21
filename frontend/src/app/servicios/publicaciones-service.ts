import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RespuestaPublicaciones } from '../interfaces/respuesta-publicaciones';
import { Publicacion } from '../interfaces/publicacion';

@Injectable({
  providedIn: 'root',
})
export class publicacionesService {
  private http = inject(HttpClient);

  getPublicaciones(publicadaPor?: string, limite?: number, orden?: string, saltar?: number) {
    let params: any = {};
    if (publicadaPor) params.publicadaPor = publicadaPor;
    if (limite) params.limite = limite;
    if (orden) params.orden = orden;
    if (saltar) params.saltar = saltar;

    return this.http.get<RespuestaPublicaciones>(`${environment.apiUrl}/publicaciones`, { params });
  }

  crearPublicacion(titulo: string, descripcion: string, imagen: File | null) {
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    if (imagen) {
      formData.append('imagen', imagen);
    }
    return this.http.post(`${environment.apiUrl}/publicaciones`, formData);
  }

  darLike(idPublicacion: string) {
    return this.http.post(`${environment.apiUrl}/publicaciones/${idPublicacion}/megusta`, {});
  }

  quitarLike(idPublicacion: string) {
    return this.http.delete(`${environment.apiUrl}/publicaciones/${idPublicacion}/megusta`);
  }

  eliminarPublicacion(idPublicacion: string) {
    return this.http.delete(`${environment.apiUrl}/publicaciones/${idPublicacion}`);
  }

  getPublicacion(id: string) {
    return this.http.get<Publicacion>(`${environment.apiUrl}/publicaciones/${id}`);
  }
}
