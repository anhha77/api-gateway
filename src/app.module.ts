import { Module } from '@nestjs/common';
import { PaymentModule } from './app/module/payment.module';
import { UserModule } from './app/module/user.module';

@Module({
  imports: [
    PaymentModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
