import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserSearchDto {
  @ApiProperty()
  @IsNotEmpty()
  public keyword: string | number;
}
