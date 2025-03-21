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
    return new Promise((resolve) => {
      this.paymentClient
      .send('get-payment', "hi")
      .subscribe((payments: { item: string; value: number; key: string }[]) => {
        resolve(payments)
      });
    })
  }

  async handlePaymentCreate(paymentData: PaymentDto): Promise<{item: string, value: number, key: string}> {
    return new Promise((resolve) => {
      this.paymentClient
      .send(
        'create-payment',
        new PaymentSerialize(paymentData.item, paymentData.value),
      )
      .subscribe((payment: { item: string; value: number; key: string }) => {
        resolve(payment)
      });
    })
  }
}
