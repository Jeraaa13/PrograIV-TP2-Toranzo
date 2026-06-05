import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './usuario.entity';
import { registroDTO } from './registro.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
  ) {}

  async create(registroDTO: registroDTO) {
    const usuarioCreado = await this.usuarioModel.create(registroDTO);
    return usuarioCreado;
  }

  async findOne(correo: string) {
    const usuario = await this.usuarioModel.findOne({ correo: correo });
    return usuario;
  }
}
