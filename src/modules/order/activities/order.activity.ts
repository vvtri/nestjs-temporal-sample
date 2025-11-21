import { Injectable } from '@nestjs/common';
import { Activities, Activity } from 'nestjs-temporal';

@Injectable()
@Activities()
export class OrderActivity {
  constructor() {}

  @Activity()
  async createOrderInDb(): Promise<{ orderId: number }> {
    // ...db operations
    return { orderId: 1 };
  }

  @Activity()
  async rollbackCreateOrderInDb(orderId: number): Promise<void> {
    // ...db operations
  }
}

export type IOrderActivity = {
  createOrderInDb(): Promise<{ orderId: number }>;
  rollbackCreateOrderInDb(orderId: number): Promise<void>;
};
