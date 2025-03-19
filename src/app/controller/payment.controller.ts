import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PaymentService } from 'src/domain/payment/payment.service';
import { PaymentDto } from '../dto/payment.dto';

@Controller('payment')
export class PaymentController implements OnModuleInit {
  constructor(
    private readonly paymentService: PaymentService,
    @Inject('PAYMENT_SERVICE') private readonly paymentCLient: ClientKafka,
  ) {}

  @Get()
  getPayments(): { item: string; value: number; key: string }[] {
    return this.paymentService.getPayments();
  }

  @Post()
  createPayment(@Body() paymentData: PaymentDto) {
    this.paymentService.handlePaymentCreate(paymentData);
  }

  onModuleInit() {
    this.paymentCLient.subscribeToResponseOf('create-payment.reply');
    this.paymentCLient.subscribeToResponseOf("get-payment.reply")
  }
}
