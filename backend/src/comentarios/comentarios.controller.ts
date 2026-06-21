import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ComentariosService } from './comentarios.service';
import { AuthGuard } from '../guards/auth/auth.guard';
import { CrearComentarioDto } from './comentario.dto';

@Controller('')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @UseGuards(AuthGuard)
  @Post('publicaciones/:idPublicacion/comentarios')
  crear(
    @Param('idPublicacion') idPublicacion: string,
    @Body() dto: CrearComentarioDto,
    @Request() req,
  ) {
    return this.comentariosService.create(
      dto.mensaje,
      idPublicacion,
      req.user.sub,
    );
  }

  @UseGuards(AuthGuard)
  @Get('publicaciones/:idPublicacion/comentarios')
  findAll(
    @Param('idPublicacion') idPublicacion: string,
    @Query('saltar') saltar?: number,
    @Query('limite') limite?: number,
  ) {
    return this.comentariosService.findAll(
      idPublicacion,
      Number(saltar),
      Number(limite),
    );
  }

  @UseGuards(AuthGuard)
  @Put('comentarios/:idComentario')
  modificar(
    @Param('idComentario') idComentario: string,
    @Request() req,
    @Body('mensaje') mensaje: string,
  ) {
    return this.comentariosService.modificar(
      idComentario,
      req.user.sub,
      mensaje,
    );
  }
}
