import {
  Get,
  Put,
  Post,
  Body,
  Query,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
  ConflictException,
} from '@nestjs/common';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { AuthGuard } from '../../guards/auth.guard';
import { UserSearchDto } from './dto/user-search.dto';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserFriendsService } from '../userFriend/user-friends.service';
import { UpdateFriendsDto } from '../userFriend/dto/user-friends-update.dto';
import { UserFriendsCreationDto } from '../userFriend/dto/user-friends-creation.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    public readonly usersService: UsersService,
    public readonly friendsService: UserFriendsService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    await this.usersService.checkIfExists(createUserDto.email);
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiQuery({
    name: 'search-keyword',
  })
  @Get('search')
  @HttpCode(HttpStatus.OK)
  async searchUserByKeyWord(
    @Query() dto: UserSearchDto,
    @AuthUser() user: UserEntity,
  ): Promise<UserEntity[]> {
    return this.usersService.searchUserByKeyWord(dto, user);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiQuery({
    name: 'recipientId',
  })
  @Post('friend')
  @HttpCode(HttpStatus.OK)
  async addFriend(
    @Query() query,
    @AuthUser() user: UserEntity,
  ): Promise<UserFriendsCreationDto> {
    return this.friendsService.addNewFriend(query.recipientId, user);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('friend/getSender')
  @HttpCode(HttpStatus.OK)
  async getFriendSender(@AuthUser() user: UserEntity): Promise<UserFriendsCreationDto[]> {
    return this.friendsService.getFriendSender(user);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('friend/getRecipient')
  @HttpCode(HttpStatus.OK)
  async getFriendRecipient(
    @AuthUser() user: UserEntity,
  ): Promise<UserFriendsCreationDto[]> {
    return this.friendsService.getFriendRecipient(user);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put('friend/update')
  @HttpCode(HttpStatus.OK)
  async updateFriendList(
    @AuthUser() user: UserEntity,
    @Body() updateFriendsDto: UpdateFriendsDto,
  ): Promise<UserFriendsCreationDto> {
    return this.friendsService.updateFriendList(updateFriendsDto, user);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.delete(id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.getOne(id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<UserEntity[]> {
    return this.usersService.getAll();
  }
}
