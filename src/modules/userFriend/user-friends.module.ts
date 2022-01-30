import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFriendsService } from './user-friends.service';
import { UserRepository } from '../users/repos/user.repository';
import { UserFriendsRepository } from './user-friends.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, UserFriendsRepository])],
  providers: [UserFriendsService],
  exports: [UserFriendsService],
})
export class UserFriendsModule {}
