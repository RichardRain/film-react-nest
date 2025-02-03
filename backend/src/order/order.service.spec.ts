import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { PostgresFilmsRepository } from '../repository/PostgreSQL/films.repository';
import { GetFullFilmDTO, GetScheduleDTO } from '../films/dto/films.dto';
import { GetOrderDTO, GetOrderResponse, GetTicketDTO } from './dto/order.dto';
import { BadRequestException } from '@nestjs/common';

describe('OrderService', () => {
  let service: OrderService;
  let repository: PostgresFilmsRepository;

  const scheduleMock: GetScheduleDTO = {
    id: '1',
    daytime: '2024-06-30T18:00:53+03:00',
    hall: 2,
    rows: 5,
    seats: 10,
    price: 100,
    taken: ['2:2'],
  };

  const updatedScheduleMock: GetScheduleDTO = {
    id: '1',
    daytime: '2024-06-30T18:00:53+03:00',
    hall: 2,
    rows: 5,
    seats: 10,
    price: 100,
    taken: ['2:2', '1:1'],
  };

  const fullFilmMock: GetFullFilmDTO = {
    id: '1',
    rating: 2.9,
    director: 'Итан Райт',
    tags: ['Документальный'],
    image: '/bg1s.jpg',
    cover: '/bg1c.jpg',
    title: 'Архитекторы общества',
    about: 'Документальный фильм',
    description: 'Документальный фильм',
    schedule: [scheduleMock],
  };

  const updatedFilmMock: GetFullFilmDTO = {
    id: '1',
    rating: 2.9,
    director: 'Итан Райт',
    tags: ['Документальный'],
    image: '/bg1s.jpg',
    cover: '/bg1c.jpg',
    title: 'Архитекторы общества',
    about: 'Документальный фильм',
    description: 'Документальный фильм',
    schedule: [updatedScheduleMock],
  };

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
    repository = {
      findOne: jest.fn().mockResolvedValue(fullFilmMock),
      findOneAndUpdate: jest.fn().mockResolvedValue(updatedFilmMock),
    } as unknown as PostgresFilmsRepository;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: 'FILMS_REPOSITORY',
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  describe('createOrder', () => {
    it('should create an order', async () => {
      const result = await service.createOrder(orderMock);
      expect(result).toEqual(responseMock);
      expect(repository.findOne).toHaveBeenCalledWith({
        id: orderMock.tickets[0].film,
      });
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith(
        { id: orderMock.tickets[0].film },
        { set: { schedule: updatedFilmMock.schedule } },
      );
    });

    it('should throw an error if film not found', async () => {
      const wrongIdMock = {
        ...orderMock,
        tickets: [{ ...ticketMock, film: 'wrongId' }],
      };
      await expect(service.createOrder(wrongIdMock)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw an error if session not found', async () => {
      const wrongIdMock = {
        ...orderMock,
        tickets: [{ ...ticketMock, session: 'wrongId' }],
      };
      await expect(service.createOrder(wrongIdMock)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw an error if seat not found', async () => {
      const wrongIdMock = {
        ...orderMock,
        tickets: [{ ...ticketMock, row: 100, seat: 100 }],
      };
      await expect(service.createOrder(wrongIdMock)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw an error if seat is taken', async () => {
      const wrongIdMock = {
        ...orderMock,
        tickets: [{ ...ticketMock, row: 2, seat: 2 }],
      };
      await expect(service.createOrder(wrongIdMock)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
