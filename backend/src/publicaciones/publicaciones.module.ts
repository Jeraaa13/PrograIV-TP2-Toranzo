import { Module } from '@nestjs/common';
import { PublicacionesController } from './publicaciones.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Publicacion, PublicacionSchema } from './publicacion.entity';
import { PublicacionesService } from './publicaciones.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Publicacion.name, schema: PublicacionSchema },
    ]),
    CloudinaryModule,
  ],
  providers: [PublicacionesService],
  controllers: [PublicacionesController],
})
export class PublicacionesModule {}
