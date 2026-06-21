import { Usuario } from './usuario';

export interface Comentario {
  _id: string;
  mensaje: string;
  usuario: Usuario;
  publicacion: string;
  fecha: Date;
  modificado: boolean;
}
