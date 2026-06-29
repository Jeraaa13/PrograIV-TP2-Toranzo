import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString, MaxLength } from 'class-validator';

export class registroDTO {
  @IsString()
  @MaxLength(50)
  nombre: string;

  @IsString()
  @MaxLength(50)
  apellido: string;

  @IsString()
  correo: string;

  @IsString()
  @MaxLength(30)
  nombreUsuario: string;

  @IsString()
  clave: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  fechaNacimiento: Date;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  descripcion: string;

  @IsString()
  @IsOptional()
  imagenPerfil: string;
}
