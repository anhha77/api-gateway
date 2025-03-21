import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Post,
  
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserService } from 'src/domain/user/user.service';
import { UserDto } from '../dto/user.dto';

@Controller('user')
export class UserController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly userService: UserService,
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}

  @Get()
  async getUsers(): Promise<{ name: string; age: number; key: string }[]> {
    let result: {name: string; age: number; key: string }[] = await this.userService.getUsers();
    result = result.map((item: {name: string, age: number, key: string}) => ({name: item.name, age: item.age, key: item.key})) 
    return result
  }

  @Post()
  async createUser(@Body() userData: UserDto): Promise<any> {
    await this.userService.handleUserCreate(userData);
    return "hi"
  }

  async onModuleInit() {
    this.userClient.subscribeToResponseOf('create-user');
    this.userClient.subscribeToResponseOf('get-user');
    await this.userClient.connect();
  }

  async onModuleDestroy() {
      await this.userClient.close();
  }
}
