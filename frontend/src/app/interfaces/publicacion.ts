import { Usuario } from './usuario';

export interface Publicacion {
  _id: string;
  titulo: string;
  descripcion: string;
  meGustas: string[];
  cantidadMeGustas: number;
  publicadaPor: Usuario;
  baja: boolean;
  fechaPublicacion: Date;
  imagenUrl?: string;
  cantidadComentarios: number;
}
