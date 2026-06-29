import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AdminGuard } from '../guards/admin/admin.guard';
import { AuthService } from '../auth/auth.service';
import { UsuariosService } from './usuarios.service';
import { registroDTO } from './registro.dto';
import { memoryStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @UseGuards(AdminGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('imagenPerfil', { storage: memoryStorage() }),
  )
  crear(
    @Body() registroDTO: registroDTO,
    @Body('perfil') perfil: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.authService.registro(registroDTO, file, perfil);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deshabilitar(@Param('id') id: string) {
    return this.usuariosService.bajaUsuario(id);
  }

  @UseGuards(AdminGuard)
  @Post(':id/activar')
  activar(@Param('id') id: string) {
    return this.usuariosService.activarUsuario(id);
  }
}
