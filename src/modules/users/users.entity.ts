import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsDate, IsEmail, IsInt, IsString } from 'class-validator';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @IsInt()
  id: number;

  @Column({ nullable: false })
  @IsString()
  firstName: string;

  @Column({ nullable: false })
  @IsString()
  lastName: string;

  @Column({ nullable: false })
  @IsInt()
  age: number;

  @Column({ nullable: false })
  @IsEmail()
  @IsString()
  email: string;

  @Column({ nullable: false })
  @IsString()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  @IsDate()
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  @IsDate()
  updatedAt: Date;

  @ManyToMany(() => UserEntity, (u) => u.id, {
    onDelete: 'CASCADE'
  })
  @JoinTable({
    name: 'user_friends',
    joinColumn: {
      name: 'senderId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'recipientId',
      referencedColumnName: 'id',
    },
  })
  friends: UserEntity[];
}
