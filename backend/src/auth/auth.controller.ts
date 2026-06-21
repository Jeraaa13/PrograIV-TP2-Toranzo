import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { registroDTO } from '../usuarios/registro.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from '../usuarios/login.dto';
import { AuthGuard } from '../guards/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registro')
  @UseInterceptors(
    FileInterceptor('imagenPerfil', { storage: memoryStorage() }),
  )
  registro(
    @Body() registroDTO: registroDTO,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.authService.registro(registroDTO, file);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO.correo, loginDTO.clave);
  }

  @UseGuards(AuthGuard)
  @Get('perfil')
  perfil(@Request() req) {
    return this.authService.findById(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post('autorizar')
  @HttpCode(200)
  autorizar(@Request() req) {
    return this.authService.findById(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Post('refrescar')
  refrescar(@Request() req) {
    return this.authService.refrescar(req.user);
  }
}
