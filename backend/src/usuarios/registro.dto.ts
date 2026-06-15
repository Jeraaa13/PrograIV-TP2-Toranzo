import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

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
  @IsOptional()
  descripcion: string;

  @IsString()
  @IsOptional()
  imagenPerfil: string;
}
