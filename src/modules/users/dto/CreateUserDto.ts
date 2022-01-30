import {
  IsInt,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty({ message: 'firstName must not be empty' })
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty({ message: 'lastName must not be empty' })
  @IsString()
  @ApiProperty()
  lastName: string;

  @IsNotEmpty({ message: 'age must not be empty' })
  @IsInt()
  @ApiProperty()
  age: number;

  @IsNotEmpty({ message: 'email must not be empty' })
  @IsEmail()
  @IsString()
  @ApiProperty()
  readonly email: string;

  @MinLength(6, { message: 'password min length 6' })
  @MaxLength(20)
  @IsString()
  @IsNotEmpty({ message: 'password must not be empty' })
  @ApiProperty()
  readonly password: string;
}
