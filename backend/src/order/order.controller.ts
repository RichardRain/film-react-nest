import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { GetOrderDTO } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/')
  createOrder(@Body() createOrderDto: GetOrderDTO) {
    return this.orderService.createOrder(createOrderDto);
  }
}
