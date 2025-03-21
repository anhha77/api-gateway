import { Module } from "@nestjs/common";
import { UserController } from "../controller/user.controller";
import { UserService } from "src/domain/user/user.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CustomKafkaSerializer } from "../utils/serialize/kafka.serialize";


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user',
            brokers: ['localhost:9094'],
          },
          consumer: {
            groupId: `user-consumer`,
          }
        },
      },
    ])
  ],

  
  providers: [UserService],
  controllers: [UserController]
})

export class UserModule {}