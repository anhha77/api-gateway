import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserDto } from 'src/app/dto/user.dto';
import { UserSerialize } from 'src/app/utils/serialize/user.serialize';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}

  async getUsers(): Promise<{ name: string; age: number; key: string }[]> {
    let data: { name: string; age: number; key: string }[] = [];
    this.userClient
      .send('get-user', null)
      .subscribe((users: { name: string; age: number; key: string }[]) => {
        data = users;
      });
    return data;
  }

  async handleUserCreate(userData: UserDto): Promise<{name: string, age: number, key: string}> {
    let data: any = {};
    this.userClient
      .send('create-user', new UserSerialize(userData.name, userData.age))
      .subscribe((user: { name: string; age: number; key: string }) => {
        data = user
      });
    return data
  }
}
