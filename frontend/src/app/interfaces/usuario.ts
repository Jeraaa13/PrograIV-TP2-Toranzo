export interface Usuario {
  _id: string;
  nombre: string;
  apellido: string;
  correo: string;
  nombreUsuario: string;
  fechaNacimiento: Date;
  descripcion: string;
  imagenPerfil: string;
  perfil: string;
  baja: boolean;
}
