import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Publicacion } from './publicacion.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CrearPublicacionDto } from './publicacion.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class PublicacionesService {
  constructor(
    @InjectModel(Publicacion.name) private publicacionModel: Model<Publicacion>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(
    crearPublicacionDto: CrearPublicacionDto,
    publicadaPor: string,
    file?: Express.Multer.File,
  ) {
    let imagenUrl;

    if (file) {
      const resultado = await this.cloudinaryService.uploadImage(file);
      imagenUrl = resultado.secure_url;
    }

    const publicacionCreada = await this.publicacionModel.create({
      ...crearPublicacionDto,
      publicadaPor,
      imagenUrl,
    });
    return publicacionCreada;
  }

  async findAll(
    orden: string = 'fechaPublicacion',
    saltar: number = 0,
    limite: number = 10,
    publicadaPor?: string,
  ) {
    const filtro: any = { baja: false };
    if (publicadaPor) {
      filtro.publicadaPor = publicadaPor;
    }
    const publicaciones = await this.publicacionModel
      .find(filtro)
      .sort({
        [orden]: -1,
      })
      .skip(saltar)
      .limit(limite)
      .populate(
        'publicadaPor',
        'nombre apellido correo nombreUsuario fechaNacimiento descripcion imagenPerfil perfil',
      );

    const total = await this.publicacionModel.countDocuments(filtro);

    return { publicaciones, total };
  }

  async darLike(idPublicacion: string, idUsuario: string) {
    const publicacion = await this.publicacionModel.findById(idPublicacion);
    if (!publicacion) throw new NotFoundException('La publicación no existe');
    const usuarioYaLikeo = publicacion.meGustas.includes(idUsuario);
    if (usuarioYaLikeo) throw new BadRequestException('Ya diste me gusta');
    publicacion.meGustas.push(idUsuario);
    await publicacion.save();
    return publicacion;
  }

  async quitarLike(idPublicacion: string, idUsuario: string) {
    const publicacion = await this.publicacionModel.findById(idPublicacion);
    if (!publicacion) throw new NotFoundException('La publicación no existe');
    const usuarioYaLikeo = publicacion.meGustas.includes(idUsuario);
    if (!usuarioYaLikeo) throw new BadRequestException('No diste me gusta');
    publicacion.meGustas = publicacion.meGustas.filter(
      (id) => id !== idUsuario,
    );
    await publicacion.save();
    return publicacion;
  }

  async bajaPublicacion(
    idPublicacion: string,
    idUsuario: string,
    perfil: string,
  ) {
    const publicacion = await this.publicacionModel.findById(idPublicacion);
    if (!publicacion) throw new NotFoundException('La publicación no existe');
    if (
      publicacion.publicadaPor.toString() !== idUsuario &&
      perfil !== 'administrador'
    )
      throw new ForbiddenException('no hay permisos suficientes');
    publicacion.baja = true;
    await publicacion.save();
    return publicacion;
  }
}
