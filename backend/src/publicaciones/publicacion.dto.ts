import { IsOptional, IsString } from 'class-validator';

export class CrearPublicacionDto {
  @IsString()
  titulo: string;
  @IsString()
  descripcion: string;
  @IsOptional()
  @IsString()
  imagenUrl: string;
}
