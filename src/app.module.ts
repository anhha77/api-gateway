import { Module } from '@nestjs/common';
import { PaymentModule } from './app/module/payment.module';
import { UserModule } from './app/module/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../src/app/utils/config/env.config';

@Module({
  imports: [
    PaymentModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
