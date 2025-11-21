import { Controller, Get, Post } from '@nestjs/common';
import { OrderService } from '../order/order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  createOrder() {
    return this.orderService.createOrder();
  }
}
