import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './repos/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFriendsModule } from '../userFriend/user-friends.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    forwardRef(() => UserFriendsModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
