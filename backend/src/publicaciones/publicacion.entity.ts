import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Publicacion {
  @Prop({
    required: true,
  })
  titulo: string;
  @Prop({ required: true })
  descripcion: string;
  @Prop()
  imagenUrl: string;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  })
  publicadaPor: string;
  @Prop({ default: [] })
  meGustas: string[];
  @Prop({ default: false })
  baja: boolean;
  @Prop({ default: Date.now })
  fechaPublicacion: Date;
  @Prop({ default: 0 })
  cantidadMeGustas: number;
  @Prop({ default: 0 })
  cantidadComentarios: number;
}

export const PublicacionSchema = SchemaFactory.createForClass(Publicacion);
