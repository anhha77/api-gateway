import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserDto } from 'src/app/dto/user.dto';
import { UserSerialize } from 'src/app/utils/serialize/user.serialize';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}

  getUsers(): { name: string; age: number; key: string }[] {
    let data: { name: string; age: number; key: string }[] = [];
    this.userClient
      .send('get_user', null)
      .subscribe((users: { name: string; age: number; key: string }[]) => {
        data = users;
      });
    return data;
  }

  handleUserCreate(userData: UserDto) {
    this.userClient
      .send('create_user', new UserSerialize(userData.name, userData.age))
      .subscribe((user: { name: string; age: number; key: string }) => {
        console.log(
          `User infomation: ${user.name} and ${user.age} and ${user.key}`,
        );
      });
  }
}
