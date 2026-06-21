import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comentario } from './comentario.entity';
import { Model } from 'mongoose';
import { Publicacion } from '../publicaciones/publicacion.entity';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectModel(Comentario.name) private comentarioModel: Model<Comentario>,
    @InjectModel(Publicacion.name) private publicacionModel: Model<Publicacion>,
  ) {}

  async create(mensaje: string, idPublicacion: string, idUsuario: string) {
    const publicacion = await this.publicacionModel.findById(idPublicacion);
    if (!publicacion) throw new NotFoundException('No existe la publicación');
    const comentario = await this.comentarioModel.create({
      mensaje,
      publicacion: idPublicacion,
      usuario: idUsuario,
    });
    publicacion.cantidadComentarios = await this.comentarioModel.countDocuments(
      { publicacion: idPublicacion },
    );
    await publicacion.save();
    return comentario;
  }

  async findAll(idPublicacion: string, saltar: number = 0, limite: number = 5) {
    const comentarios = await this.comentarioModel
      .find({ publicacion: idPublicacion })
      .sort({ fecha: -1 })
      .skip(saltar)
      .limit(limite)
      .populate('usuario', 'nombreUsuario imagenPerfil');

    const total = await this.comentarioModel.countDocuments({
      publicacion: idPublicacion,
    });

    return { comentarios, total };
  }

  async modificar(idComentario: string, idUsuario: string, mensaje: string) {
    const comentario = await this.comentarioModel.findById(idComentario);
    if (!comentario) throw new NotFoundException('No existe el comentarrio');
    const noEsElAutor = comentario.usuario.toString() !== idUsuario;
    if (noEsElAutor)
      throw new ForbiddenException('No es el autor del comentario');
    comentario.mensaje = mensaje;
    comentario.modificado = true;
    await comentario.save();
    return comentario;
  }
}
