import { Module } from "@nestjs/common";
import { UserController } from "../controller/user.controller";
import { UserService } from "src/domain/user/user.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'user-consumer',
          },
        },
      },
    ])
  ],
  providers: [UserService],
  controllers: [UserController]
})

export class UserModule {}