import { IsNumber, IsSemVer, IsString } from 'class-validator';

export class CreateAlumnoDto {
  @IsString()
  nombre: string;
  @IsString()
  apellido: string;
  @IsNumber()
  edad: number;
  @IsNumber()
  legajo: number;
}
