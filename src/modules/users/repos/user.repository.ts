import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { UserEntity } from '../users.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
