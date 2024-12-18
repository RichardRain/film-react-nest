import { Injectable } from '@nestjs/common';
import { GetFilmDTO, GetScheduleDTO } from './dto/films.dto';
import { FilmsRepository } from '../repository/films.repository';
import { convertToDTO } from '../utils/dtoConverter';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}
  async getAllFilms() {
    return await this.filmsRepository.find()
      .then((data) => {
        return {
          total: data.length,
          items: data.map((film) => {
            return convertToDTO<GetFilmDTO>(film);
          }),
        };
      })
      .catch((err) => {console.log(err)});
  }

  async getScheduleByFilmId(id: string) {
    return await this.filmsRepository.findOne({id: id})
      .then((data) => {
        return {
          total: data.schedule.length,
          items: data.schedule.map((schedule) => {
            return convertToDTO<GetScheduleDTO>(schedule);
          }),
        };
      })
      .catch((err) => {console.log(err)});
  }
}
