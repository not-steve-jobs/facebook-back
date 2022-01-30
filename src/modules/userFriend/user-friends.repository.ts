import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { UserFriendsEntity } from './user-friends.entity';

@EntityRepository(UserFriendsEntity)
export class UserFriendsRepository extends Repository<UserFriendsEntity> {}
