import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GetFilmDTO, GetScheduleDTO } from './dto/films.dto';
import { FilmsRepository } from '../repository/films.repository';
import { convertToDTO } from '../utils/dtoConverter';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}
  async getAllFilms() {
    try {
      const data = await this.filmsRepository.find();
      return {
        total: data.length,
        items: data.map((film) => convertToDTO<GetFilmDTO>(film)),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Не удалось получить список фильмов: ',
        error.message,
      );
    }
  }

  async getScheduleByFilmId(id: string) {
    try {
      const film = await this.filmsRepository.findOne({ id });
      if (!film) {
        throw new NotFoundException(`Фильм с id ${id} не найден.`);
      }
      return {
        total: film.schedule.length,
        items: film.schedule.map((schedule) =>
          convertToDTO<GetScheduleDTO>(schedule),
        ),
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Не удалось получить расписание фильма:',
        error.message,
      );
    }
  }
}
