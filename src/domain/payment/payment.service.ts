import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PaymentDto } from 'src/app/dto/payment.dto';
import { PaymentSerialize } from 'src/app/utils/serialize/payment.serialize';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_SERVICE') private readonly paymentClient: ClientKafka,
  ) {}

  async getPayments(): Promise<{ item: string; value: number; key: string }[]> {
    let data: { item: string; value: number; key: string }[] = [];
    this.paymentClient
      .send('get-payment', null)
      .subscribe((payments: { item: string; value: number; key: string }[]) => {
        data = payments;
      });
    return data;
  }

  async handlePaymentCreate(paymentData: PaymentDto): Promise<{item: string, value: number, key: string}> {
    let data: any = {}
    this.paymentClient
      .send(
        'create-payment',
        new PaymentSerialize(paymentData.item, paymentData.value),
      )
      .subscribe((payment: { item: string; value: number; key: string }) => {
        data = payment
      });
    return data
  }
}
