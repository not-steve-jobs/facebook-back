import { IsNotEmpty } from 'class-validator';
import { StatusEnum } from '../../../constants/friendStatus';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFriendsDto {
  @IsNotEmpty({ message: 'recipientId must not be empty' })
  @ApiProperty()
  senderId: string;

  @IsNotEmpty({ message: 'status must not be empty' })
  @ApiProperty()
  status: StatusEnum;
}
