import { UserEntity } from '../users/users.entity';
import { StatusEnum } from '../../constants/friendStatus';
import { UserFriendsEntity } from './user-friends.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../users/repos/user.repository';
import { UpdateFriendsDto } from './dto/user-friends-update.dto';
import { UserFriendsRepository } from './user-friends.repository';
import { UserFriendsCreationDto } from './dto/user-friends-creation.dto';

@Injectable()
export class UserFriendsService {
  constructor(
    public readonly friendsRepository: UserFriendsRepository,
    public readonly userRepository: UserRepository,
  ) {}

  async addNewFriend(
    recipientId: number,
    user: UserEntity,
  ): Promise<UserFriendsCreationDto> {
    const recipient = await this.userRepository.findOne(recipientId);
    if (!recipientId || !recipient) {
      throw new NotFoundException('User not found');
    }
    const friend = await this.friendsRepository.create({
      recipientId,
      senderId: user.id,
      status: StatusEnum.SENDING,
    });
    return await this.friendsRepository.save(friend);
  }

  async getFriendSender(user: UserEntity): Promise<UserFriendsCreationDto[]> {
    return this.friendsRepository.find({
      where: {
        senderId: user.id,
      },
    });
  }

  async getFriendRecipient(user: UserEntity): Promise<UserFriendsCreationDto[]> {
    return this.friendsRepository.find({
      where: {
        recipientId: user.id,
      },
    });
  }
  async updateFriendList(
    updateFriendsDto: UpdateFriendsDto,
    user: UserEntity,
  ): Promise<UserFriendsEntity> {
    const friend = await this.friendsRepository.findOne({
      where: {
        senderId: updateFriendsDto.senderId,
        recipientId: user.id,
      }
    });
    if (!friend) {
      throw new NotFoundException('friend');
    }
    friend.status = updateFriendsDto.status;
    return this.friendsRepository.save(friend);
  }
}
