import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { AuthGuard } from '../guards/auth/auth.guard';
import { CrearPublicacionDto } from './publicacion.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionService: PublicacionesService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('imagen', { storage: memoryStorage() }))
  async crear(
    @Body() crearPublicacionDto: CrearPublicacionDto,
    @Request() req,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.publicacionService.create(
      crearPublicacionDto,
      req.user.sub,
      file,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Query('orden') orden: string,
    @Query('saltar') saltar: string,
    @Query('limite') limite: string,
    @Query('publicadaPor') publicadaPor?: string,
  ) {
    return this.publicacionService.findAll(
      orden,
      Number(saltar),
      Number(limite),
      publicadaPor,
    );
  }

  @UseGuards(AuthGuard)
  @Post(':id/megusta')
  async darLike(@Param('id') id: string, @Request() req) {
    return this.publicacionService.darLike(id, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Delete(':id/megusta')
  async quitarLike(@Param('id') id: string, @Request() req) {
    return this.publicacionService.quitarLike(id, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async darBajaPublicacion(@Param('id') id: string, @Request() req) {
    return this.publicacionService.bajaPublicacion(
      id,
      req.user.sub,
      req.user.perfil,
    );
  }
}
