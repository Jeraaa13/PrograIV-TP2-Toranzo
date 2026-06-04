import { Injectable } from '@nestjs/common';
import { registroDTO } from 'src/usuarios/registro.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usuarioService: UsuariosService) {}

  async registro(dto: registroDTO) {
    const clave = dto.clave;
    dto.clave = await bcrypt.hash(clave, 10);
    return this.usuarioService.create(dto);
  }

  async login(mail: string, clave: string) {
    const usuario = await this.usuarioService.findOne(mail);
    if (!usuario) return null;

    if (await bcrypt.compare(clave, usuario.clave)) {
      const { clave: _, ...usuarioSinClave } = usuario.toObject();
      return usuarioSinClave;
    }
    return null;
  }
}
