import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMatriculaDto {
  @IsString()
  @ApiProperty({ example: '2026-1' })
  periodo: string;

  @IsString()
  @ApiProperty({ example: 'tecnologia desarrollo software' })
  carrera: string;
}
