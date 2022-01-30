import * as bcrypt from 'bcrypt';
import { UserEntity } from './users.entity';
import { Brackets, FindConditions } from 'typeorm';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { CreateUserDto } from './dto/CreateUserDto';
import { UserSearchDto } from './dto/user-search.dto';
import { UserRepository } from './repos/user.repository';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(public readonly userRepository: UserRepository) {}
  /**
   * Find single user
   */
  findOne(findData: FindConditions<UserEntity>): Promise<UserEntity> {
    return this.userRepository.findOne(findData);
  }
  /**
   * generate hash from password or string
   * @param {string} password
   * @returns {string}
   */
  generateHash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create({
      ...createUserDto,
      password: this.generateHash(createUserDto.password),
    });

    return this.userRepository.save(user);
  }
  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException();
    }
    user.firstName = updateUserDto.firstName || user.firstName;
    user.lastName = updateUserDto.lastName || user.lastName;
    user.age = updateUserDto.age || user.age;
    return this.userRepository.save(user);
  }
  async getOne(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['friendsSender', 'friendsRecipient'],
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
  async delete(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException();
    }
    await this.userRepository.delete(userId);
    return user;
  }
  public async checkIfExists(email: string): Promise<boolean> {
    const existing = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email= :email', { email })
        .getOne();
    if (existing) {
      throw new ConflictException('user found');
    }
    return true;
  }
  async searchUserByKeyWord(
    keyword: UserSearchDto,
    user: UserEntity,
  ): Promise<UserEntity[]> {
    const users = this.userRepository
      .createQueryBuilder('user')
      .where(
        new Brackets((qb) => {
          qb.where(
            'user.lastName like :lastName OR user.firstName like :firstName',
            { lastName: `%${keyword}%`, firstName: `%${keyword}%` },
          );
        }),
      );
    if (typeof keyword === 'number') {
      users.orWhere('user.age like :age', { age: `%${keyword}%` });
    }
    users.andWhere('user.id != :userId', { userId: user.id });
    return await users.getMany();
  }
}
