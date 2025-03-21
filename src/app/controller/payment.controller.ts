import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PaymentService } from 'src/domain/payment/payment.service';
import { PaymentDto } from '../dto/payment.dto';

@Controller('payment')
export class PaymentController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly paymentService: PaymentService,
    @Inject('PAYMENT_SERVICE') private readonly paymentCLient: ClientKafka,
  ) {}

  @Get()
  async getPayments(): Promise<{ item: string; value: number; key: string }[]> {
    return await this.paymentService.getPayments();
  }

  @Post()
  async createPayment(@Body() paymentData: PaymentDto): Promise<{item: string, value: number, key: string}> {
    return await this.paymentService.handlePaymentCreate(paymentData);
  }

  async onModuleInit() {
      this.paymentCLient.subscribeToResponseOf('create-payment');
      this.paymentCLient.subscribeToResponseOf("get-payment")
      await this.paymentCLient.connect()
    }

  async onModuleDestroy() {
      this.paymentCLient.close();
  }
}


