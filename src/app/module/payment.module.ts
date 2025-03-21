import { Module } from "@nestjs/common";
import { PaymentController } from "../controller/payment.controller";
import { PaymentService } from "src/domain/payment/payment.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'payment',
            brokers: ['localhost:9094'],
          },
          consumer: {
            groupId: 'payment-consumer',
          },
        },
      },
    ])
  ],
  providers: [PaymentService],
  controllers: [PaymentController]
})

export class PaymentModule {}