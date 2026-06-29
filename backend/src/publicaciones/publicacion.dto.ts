import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CrearPublicacionDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  titulo: string;
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  descripcion: string;
  @IsOptional()
  @IsString()
  imagenUrl: string;
}
