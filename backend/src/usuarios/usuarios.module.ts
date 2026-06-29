import { forwardRef, Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema, Usuario } from './usuario.entity';
import { UsuariosService } from './usuarios.service';
import { AutenticacionModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
    forwardRef(() => AutenticacionModule),
  ],
  providers: [UsuariosService],
  controllers: [UsuariosController],
  exports: [UsuariosService],
})
export class UsuariosModule {}
