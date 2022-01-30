import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StatusEnum } from '../../../constants/friendStatus';

export class UserFriendsCreationDto {
  @IsNotEmpty({ message: 'recipientId must not be empty' })
  @IsInt()
  @ApiProperty()
  recipientId: number;

  @IsNotEmpty({ message: 'senderId must not be empty' })
  @IsInt()
  @ApiProperty()
  senderId: number;

  @IsOptional()
  @ApiPropertyOptional()
  status: StatusEnum;
}
