import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { GetOrderResponse, GetTicketDTO, GetOrderDTO } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  const ticketMock: GetTicketDTO = {
    film: '1',
    session: '1',
    daytime: '2024-06-30T18:00:53+03:00',
    row: 1,
    seat: 1,
    price: 100,
  };

  const responseMock: GetOrderResponse = {
    total: 1,
    items: [ticketMock],
  };

  const orderMock: GetOrderDTO = {
    email: 'test@test.com',
    phone: '89000000000',
    tickets: [ticketMock],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        createOrder: jest.fn().mockReturnValue(responseMock),
      })
      .compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  describe('createOrder', () => {
    it('should return an order', async () => {
      const result = await controller.createOrder(orderMock);
      expect(result).toEqual(responseMock);
      expect(service.createOrder).toHaveBeenCalledWith(orderMock);
    });
  });
});
