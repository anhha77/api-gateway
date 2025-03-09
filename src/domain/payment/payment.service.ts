import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PaymentDto } from 'src/app/dto/payment.dto';
import { PaymentSerialize } from 'src/app/utils/serialize/payment.serialize';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_SERVICE') private readonly paymentClient: ClientKafka,
  ) {}

  getPayments(): { item: string; value: number; key: string }[] {
    let data: { item: string; value: number; key: string }[] = [];
    this.paymentClient
      .send('get_payment', null)
      .subscribe((payments: { item: string; value: number; key: string }[]) => {
        data = payments;
      });
    return data;
  }

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
