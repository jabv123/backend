import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MatriculasService } from './matriculas.service';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { Matricula } from './entities/matricula.entity';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('matriculas')
@ApiBearerAuth()
@Controller('matriculas')
export class MatriculasController {
  constructor(private readonly matriculasService: MatriculasService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Crear matrícula (solo admin)' })
  @ApiResponse({
    status: 201,
    description: 'Matrícula creada',
    type: Matricula,
  })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  async create(@Body() createMatriculaDto: CreateMatriculaDto): Promise<Matricula> {
    return this.matriculasService.create(createMatriculaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar matrículas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de matrículas',
    type: [Matricula],
  })
  async findAll(): Promise<Matricula[]> {
    return this.matriculasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener matrícula por ID' })
  @ApiResponse({
    status: 200,
    description: 'Matrícula encontrada',
    type: Matricula,
  })
  async findOne(@Param('id') id: string): Promise<Matricula> {
    return this.matriculasService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Actualizar matrícula (solo admin)' })
  @ApiResponse({
    status: 200,
    description: 'Matrícula actualizada',
    type: Matricula,
  })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  async update(
    @Param('id') id: string,
    @Body() updateMatriculaDto: UpdateMatriculaDto,
  ): Promise<Matricula> {
    return this.matriculasService.update(+id, updateMatriculaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Eliminar matrícula (solo admin)' })
  @ApiResponse({ status: 200, description: 'Matrícula eliminada' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.matriculasService.remove(+id);
  }
}
