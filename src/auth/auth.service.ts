import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../modules/users/repos/user.repository';
import { UserLoginDto } from './dto/UserLoginDto';
import { UserEntity } from '../modules/users/users.entity';
import * as bcrypt from 'bcrypt';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    public readonly userRepository: UserRepository,
    public readonly jwtService: JwtService,
  ) {}
  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      email,
    });
  }
  async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
    const user = await this.getUserByEmail(userLoginDto.email);
    const isPasswordValid = await this.validateHash(
      userLoginDto.password,
      user && user.password,
    );
    if (!user || !isPasswordValid) {
      throw new NotFoundException();
    }
    return user;
  }
  async loginUser(userLoginDto: UserLoginDto): Promise<any> {
    const userEntity = await this.validateUser(userLoginDto);

    const token = await this.createToken(userEntity);

    return {
      userEntity,
      token,
    };
  }
  async validateHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash || '');
  }
  async createToken(user: UserEntity): Promise<any> {
    return new TokenPayloadDto({
      expiresIn: Number(process.env.JWT_EXPIRATION_TIME),
      accessToken: await this.jwtService.signAsync({ id: user.id }),
    });
  }
}
