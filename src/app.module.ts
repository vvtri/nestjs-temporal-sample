import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemporalModule } from 'nestjs-temporal';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    TemporalModule.registerClient({
      connection: {
        address: 'localhost:7233',
      },
      name: 'sample',
    }),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
