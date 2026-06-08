import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { Model, overwriteMiddlewareArguments } from 'mongoose';
import { Publicacion } from './publicacion.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CrearPublicacionDto } from './publicacion.dto';

@Injectable()
export class PublicacionesService {
  constructor(
    @InjectModel(Publicacion.name) private publicacionModel: Model<Publicacion>,
  ) {}

  async create(crearPublicacionDto: CrearPublicacionDto, publicadaPor: string) {
    const publicacionCreada = await this.publicacionModel.create({
      ...crearPublicacionDto,
      publicadaPor,
    });
    return publicacionCreada;
  }

  async findAll(
    orden: string = 'fechaPublicacion',
    saltar: number = 0,
    limite: number = 10,
  ) {
    return await this.publicacionModel
      .find({ baja: false })
      .sort({
        [orden]: -1,
      })
      .skip(saltar)
      .limit(limite);
  }

  async darLike(idPublicacion: string, idUsuario: string) {
    const publicacion = await this.publicacionModel.findById(idPublicacion);
    if (!publicacion) throw new NotFoundException('La publiación no existe');
    const usuarioYaLikeo = publicacion.meGustas.includes(idUsuario);
    if (usuarioYaLikeo) throw new BadRequestException('Ya diste me gusta');
    publicacion.meGustas.push(idUsuario);
    await publicacion.save();
    return publicacion;
  }
}
