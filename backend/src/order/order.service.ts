import { Injectable } from '@nestjs/common';
import { OrderDTO, ResponseOrderDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
  createOrder(orderDto: OrderDTO): ResponseOrderDTO {
    // Заглушка: возвращает подтверждение заказа
    return {
      total: 0,
      items: [],
    };
  }
}
