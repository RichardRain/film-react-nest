import { Injectable } from '@nestjs/common';
import { GetOrderDTO } from './dto/order.dto';
import { FilmsRepository } from 'src/repository/films.repository';
import { convertToDTO } from 'src/utils/dtoConverter';
import { GetFilmDTO } from 'src/films/dto/films.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(orderDto: GetOrderDTO) {
    for (const ticket of orderDto.tickets) {
      const film = await this.filmsRepository.findOne({id: ticket.film});
      const filmDto = convertToDTO<GetFilmDTO>(film);
      const filmSession = filmDto.schedule.find((session) => session.id === ticket.session);
      const sessionIndex = filmDto.schedule.findIndex((session) => session.id === ticket.session);
      if (!filmSession) {
        throw new BadRequestException(`Сеанс с id ${ticket.session} не найден.`);
      }
      if (ticket.row > filmSession.rows || ticket.seat > filmSession.seats) {
        throw new BadRequestException(`Место номер ${ticket.seat} в ряду ${ticket.row} не существует. Пожалуйста, выберите другое место.`);
      };
      filmSession.taken.forEach((occupiedSeat) => {
        if (occupiedSeat === `${ticket.row}:${ticket.seat}`) {
          throw new BadRequestException(`Место номер ${ticket.seat} в ряду ${ticket.row} уже занято. Пожалуйста, выберите другое место.`);
        }
      });
      filmSession.taken.push(`${ticket.row}:${ticket.seat}`);
      try {
        await this.filmsRepository.findOneAndUpdate({id: filmDto.id}, {$set: {[`schedule.${sessionIndex}.taken`]: filmSession.taken}});
      }
      catch(err) {
        console.log(err)
      }
    };
    return {
      total: orderDto.tickets.length,
      items: orderDto.tickets,
    }
  }
}