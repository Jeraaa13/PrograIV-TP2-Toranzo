import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Comentario {
  @Prop({ required: true })
  mensaje: string;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publicacion',
  })
  publicacion: string;
  @Prop({ default: Date.now })
  fecha: Date;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  })
  usuario: string;
  @Prop({ default: false })
  modificado: boolean;
}

export const ComentarioSchema = SchemaFactory.createForClass(Comentario);
