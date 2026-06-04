import { Transform } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class registroDTO {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  correo: string;

  @IsString()
  nombreUsuario: string;

  @IsString()
  clave: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  fechaNacimiento: Date;
  @IsString()
  descripcion: string;

  @IsString()
  imagenPerfil: string;
}
