import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Usuario {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellido: string;

  @Prop({ required: true, unique: true })
  correo: string;

  @Prop({ required: true })
  nombreUsuario: string;

  @Prop({ required: true })
  clave: string;

  @Prop({ required: true })
  fechaNacimiento: Date;

  @Prop()
  descripcion: string;

  @Prop()
  imagenPerfil: string;

  @Prop({ required: true, default: 'usuario' })
  perfil: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
