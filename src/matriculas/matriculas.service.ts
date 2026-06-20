import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { Matricula } from './entities/matricula.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatriculasService {
  constructor(
    @InjectRepository(Matricula)
    private readonly matriculasRepository: Repository<Matricula>,
  ) {}

  async findAll(): Promise<Matricula[]> {
    return this.matriculasRepository.find();
  }

  async create(dto: CreateMatriculaDto): Promise<Matricula> {
    const matricula = this.matriculasRepository.create({
      periodo: dto.periodo,
      carrera: dto.carrera,
    });
    return this.matriculasRepository.save(matricula);
  }

  async findOne(id: number): Promise<Matricula> {
    const matricula = await this.matriculasRepository.findOneBy({ id });
    if (!matricula) {
      throw new NotFoundException(`Matrícula con id ${id} no encontrada`);
    }
    return matricula;
  }

  async update(
    id: number,
    updateMatriculaDto: UpdateMatriculaDto,
  ): Promise<Matricula> {
    await this.matriculasRepository.update(id, updateMatriculaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.matriculasRepository.delete(id);
  }
}
