import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  RequestTimeoutException,
  UseGuards,
} from '@nestjs/common';
import { PublicacionesService } from './publicaciones.service';
import { AuthGuard } from '../guards/auth/auth.guard';
import { CrearPublicacionDto } from './publicacion.dto';

@Controller('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionService: PublicacionesService) {}

  @UseGuards(AuthGuard)
  @Post()
  async crear(
    @Body() crearPublicacionDto: CrearPublicacionDto,
    @Request() req,
  ) {
    return this.publicacionService.create(crearPublicacionDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Query('orden') orden: string,
    @Query('saltar') saltar: string,
    @Query('limite') limite: string,
  ) {
    return this.publicacionService.findAll(
      orden,
      Number(saltar),
      Number(limite),
    );
  }

  @UseGuards(AuthGuard)
  @Post(':id/megusta')
  async darMeGusta(@Param('id') id: string, @Request() req) {
    return this.publicacionService.darLike(id, req.user.sub);
  }
}
