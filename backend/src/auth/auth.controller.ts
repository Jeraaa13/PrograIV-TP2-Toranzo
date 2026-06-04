import { Controller, Get, Post, Body, Param, HttpCode } from '@nestjs/common';
import { registroDTO } from '../usuarios/registro.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from '../usuarios/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registro')
  @HttpCode(201)
  registro(@Body() registroDTO: registroDTO) {
    return this.authService.registro(registroDTO);
  }

  @Post('login')
  @HttpCode(201)
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO.correo, loginDTO.clave);
  }
}
