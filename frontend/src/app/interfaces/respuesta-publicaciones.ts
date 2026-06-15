import { Publicacion } from './publicacion';

export interface RespuestaPublicaciones {
  publicaciones: Publicacion[];
  total: number;
}
