import { Injectable } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AlumnosService {
  constructor(@InjectModel(Alumno.name) private alumnoModel: Model<Alumno>) {}
  async create(createAlumnoDto: CreateAlumnoDto) {
    const alumnoCreado = await this.alumnoModel.create(createAlumnoDto);
    return alumnoCreado;
  }

  async findAll() {
    const alumnos = await this.alumnoModel.find();
    return alumnos;
  }

  async findOne(id: string) {
    const alumno = await this.alumnoModel.findById(id);
    return alumno;
  }

  async update(id: string, updateAlumnoDto: UpdateAlumnoDto) {
    const alumnoActualizado = await this.alumnoModel.updateOne(
      { _id: id },
      updateAlumnoDto,
    );
    return alumnoActualizado;
  }

  async remove(id: string) {
    const alumnoEliminado = await this.alumnoModel.deleteOne({ _id: id });
    return alumnoEliminado;
  }
}
