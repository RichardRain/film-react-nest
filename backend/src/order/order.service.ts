import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { GetOrderDTO } from './dto/order.dto';
import { convertToDTO } from '../utils/dtoConverter';
import { GetFullFilmDTO } from '../films/dto/films.dto';
import { BadRequestException } from '@nestjs/common';
import { MongoFilmsRepository } from '../repository/MongoDB/films.repository';
import { PostgresFilmsRepository } from '../repository/PostgreSQL/films.repository';

@Injectable()
export class OrderService {
  constructor(
    @Inject('FILMS_REPOSITORY')
    private readonly filmsRepository:
      | MongoFilmsRepository
      | PostgresFilmsRepository,
  ) {}

  async createOrder(orderDto: GetOrderDTO) {
    try {
      const filmIds = orderDto.tickets.map((ticket) => ticket.film);
      const films = await Promise.all(
        filmIds.map((filmId) => this.filmsRepository.findOne({ id: filmId })),
      );

      const filmsDtos = films.map((film) =>
        convertToDTO<GetFullFilmDTO>(film, GetFullFilmDTO),
      );

      for (const ticket of orderDto.tickets) {
        const filmDto = filmsDtos.find((film) => film.id === ticket.film);

        if (!filmDto) {
          throw new BadRequestException(`Фильм с id ${ticket.film} не найден.`);
        }

        const filmSession = filmDto.schedule.find(
          (session) => session.id === ticket.session,
        );

        if (!filmSession) {
          throw new BadRequestException(
            `Сеанс с id ${ticket.session} не найден.`,
          );
        }

        if (ticket.row > filmSession.rows || ticket.seat > filmSession.seats) {
          throw new BadRequestException(
            `Место номер ${ticket.seat} в ряду ${ticket.row} не существует. Пожалуйста, выберите другое место.`,
          );
        }

        if (filmSession.taken.includes(`${ticket.row}:${ticket.seat}`)) {
          throw new BadRequestException(
            `Место номер ${ticket.seat} в ряду ${ticket.row} уже занято. Пожалуйста, выберите другое место.`,
          );
        }

        filmSession.taken.push(`${ticket.row}:${ticket.seat}`);

        const sessionIndex = filmDto.schedule.findIndex(
          (session) => session.id === ticket.session,
        );

        if (this.filmsRepository instanceof MongoFilmsRepository) {
          await this.filmsRepository.findOneAndUpdate(
            { id: filmDto.id },
            { $set: { [`schedule.${sessionIndex}.taken`]: filmSession.taken } },
          );
        } else {
          const filmToUpdtae = await this.filmsRepository.findOne({
            id: filmDto.id,
          });
          filmToUpdtae.schedule[sessionIndex].taken = filmSession.taken;
          await this.filmsRepository.findOneAndUpdate(
            { id: filmDto.id },
            { set: { schedule: filmToUpdtae.schedule } },
          );
        }

        return {
          total: orderDto.tickets.length,
          items: orderDto.tickets,
        };
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Не удалось создать заказ:',
        error.message,
      );
    }
  }
}
