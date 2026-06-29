import { HttpClient } from '@angular/common/http';
import { inject, Injectable, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EstadisticasService {
  private http = inject(HttpClient);

  getPublicacionesPorUsuario(desde: string, hasta: string) {
    return this.http.get<any[]>(`${environment.apiUrl}/publicaciones/estadisticas`, {
      params: { desde, hasta },
    });
  }

  getComentariosPorDia(desde: string, hasta: string) {
    return this.http.get<any[]>(`${environment.apiUrl}/comentarios/estadisticas`, {
      params: { desde, hasta },
    });
  }

  getComentariosPorPublicacion(desde: string, hasta: string) {
    return this.http.get<any[]>(`${environment.apiUrl}/comentarios/estadisticas/publicaciones`, {
      params: { desde, hasta },
    });
  }
}
