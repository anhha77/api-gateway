import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserDto } from 'src/app/dto/user.dto';
import { UserSerialize } from 'src/app/utils/serialize/user.serialize';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}

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
