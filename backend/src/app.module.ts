import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PublicacionesModule } from './publicaciones/publicaciones.module';
import { AutenticacionModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { env } from 'process';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(env.MONGO_URL!),
    PublicacionesModule,
    AutenticacionModule,
    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
