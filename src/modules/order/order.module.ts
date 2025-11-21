import { Module } from '@nestjs/common';
import { TemporalModule } from 'nestjs-temporal';
import { OrderActivity } from './activities/order.activity';
import { PaymentClientActivity } from './activities/payment-client.activity';
import { OrderService } from './order/order.service';
import * as path from 'path';
import { OrderController } from './controllers/order.controller';

@Module({
  imports: [
    TemporalModule.registerClient(),
    TemporalModule.registerWorker({
      workerOptions: {
        taskQueue: 'default',
        workflowsPath: path.join(__dirname, 'workflows', 'order.workflow.js'),
      },
      activityClasses: [OrderActivity, PaymentClientActivity],
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderActivity, PaymentClientActivity],
  exports: [OrderService],
})
export class OrderModule {}
