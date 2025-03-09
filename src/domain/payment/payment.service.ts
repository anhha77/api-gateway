import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PaymentDto } from 'src/app/dto/payment.dto';
import { PaymentSerialize } from 'src/app/utils/serialize/payment.serialize';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_SERVICE') private readonly paymentClient: ClientKafka,
  ) {}

  handlePaymentCreate(paymentData: PaymentDto) {
    this.paymentClient
      .send(
        'create_payment',
        new PaymentSerialize(paymentData.item, paymentData.value),
      )
      .subscribe((payment: { item: string; value: number; key: string }) => {
        console.log(
          `Payment infomation: ${payment.item} and ${payment.value} and ${payment.key}`,
        );
      });
  }
}
