import {
  Column,
  Entity,
  BaseEntity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsInt, IsNotEmpty } from 'class-validator';
import { StatusEnum } from '../../constants/friendStatus';

@Entity({ name: 'user_friends' })
export class UserFriendsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @IsInt()
  id: number;

  @Column()
  @IsNotEmpty()
  @PrimaryColumn()
  senderId: number;

  @Column()
  @IsNotEmpty()
  @PrimaryColumn()
  recipientId: number;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.SENDING,
  })
  status: StatusEnum;
}
