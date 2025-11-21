import { Injectable } from '@nestjs/common';
import { WorkflowClient } from '@temporalio/client';
import { InjectTemporalClient } from 'nestjs-temporal';
import { createOrderWorkflow } from '../workflows/order.workflow';

@Injectable()
export class OrderService {
  constructor(
    @InjectTemporalClient() private readonly temporalClient: WorkflowClient,
  ) {}

  async createOrder() {
    const handle = await this.temporalClient.start(createOrderWorkflow, {
      args: ['Any arguments'],
      taskQueue: 'default',
      workflowId: 'wf-id-' + Math.floor(Math.random() * 1000), //unique id
    });
    console.log(`Started workflow ${handle.workflowId}`);
  }
}
