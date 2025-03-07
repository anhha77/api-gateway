import { Body, Controller, Get, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserService } from 'src/domain/user/user.service';
import { UserDto } from '../dto/user.dto';

@Controller('user')
export class UserController implements OnModuleInit{
  constructor(
    private readonly userService: UserService,
    @Inject("USER_SERVICE") private readonly userClient: ClientKafka
  ) {}

  @Post()
  createUser(@Body() userData: UserDto) {
    this.userService.handleUserCreate(userData);
  }

  onModuleInit() {
    this.userClient.subscribeToResponseOf("create_user")
  }
}
