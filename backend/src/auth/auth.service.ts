import { Injectable, UnauthorizedException } from '@nestjs/common';
import { registroDTO } from '../usuarios/registro.dto';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usuarioService: UsuariosService) {}

  async registro(dto: registroDTO) {
    const clave = dto.clave;
    dto.clave = await bcrypt.hash(clave, 10);
    return this.usuarioService.create(dto);
  }

  async login(correo: string, clave: string) {
    const usuario = await this.usuarioService.findOne(correo);
    if (!usuario) throw new UnauthorizedException('Credenciales invalidas');

    if (await bcrypt.compare(clave, usuario.clave)) {
      const { clave: _, ...usuarioSinClave } = usuario.toObject();
      return usuarioSinClave;
    }
    throw new UnauthorizedException('Credenciales invalidas');
  }
}
