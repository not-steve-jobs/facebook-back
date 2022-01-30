import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @ApiPropertyOptional()
  firstName: string;

  @IsOptional()
  @ApiPropertyOptional()
  lastName: string;

  @IsOptional()
  @ApiPropertyOptional()
  age: number;
}
