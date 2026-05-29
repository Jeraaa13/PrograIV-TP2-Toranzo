import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Alumno {
  @Prop({ required: true })
  nombre: string;
  @Prop({ required: true, unique: true })
  apellido: string;
  @Prop({ required: true, min: 18, max: 100 })
  edad: number;
  @Prop({ required: true, unique: true })
  legajo: number;
}

export const AlumnoSchema = SchemaFactory.createForClass(Alumno);
