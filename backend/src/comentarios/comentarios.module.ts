import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comentario, ComentarioSchema } from './comentario.entity';
import { ComentariosService } from './comentarios.service';
import { ComentariosController } from './comentarios.controller';
import {
  Publicacion,
  PublicacionSchema,
} from '../publicaciones/publicacion.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comentario.name, schema: ComentarioSchema },
      { name: Publicacion.name, schema: PublicacionSchema },
    ]),
  ],
  providers: [ComentariosService],
  controllers: [ComentariosController],
})
export class ComentariosModule {}
