import { IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  correo: string;

  @IsString()
  clave: string;
}
