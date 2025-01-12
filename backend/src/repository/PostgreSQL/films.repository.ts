import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmEntity } from '../../films/entities/film.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CommonFilmsRepository, UpdateAction } from '../repositoryInterfaces';

@Injectable()
export class PostgresFilmsRepository
  implements CommonFilmsRepository<FilmEntity>
{
  constructor(
    @InjectRepository(FilmEntity)
    private filmRepository: Repository<FilmEntity>,
  ) {}

  async findOne(
    filter: FindOptionsWhere<FilmEntity>,
  ): Promise<FilmEntity | null> {
    return this.filmRepository.findOne({
      where: filter,
      relations: ['schedule'],
    });
  }

  async find(filter?: FindOptionsWhere<FilmEntity>): Promise<FilmEntity[]> {
    return this.filmRepository.find({ where: filter });
  }

  async create(filmData: Partial<FilmEntity>): Promise<FilmEntity> {
    const film = this.filmRepository.create(filmData);
    return this.filmRepository.save(film);
  }

  async findOneAndUpdate(
    filter: FindOptionsWhere<FilmEntity>,
    updateData: UpdateAction<FilmEntity>,
  ): Promise<FilmEntity | null> {
    const film = await this.filmRepository.findOne({
      where: filter,
      relations: ['schedule'],
    });
    if (film) {
      Object.assign(film, updateData.set);
      return this.filmRepository.save(film);
    }
    return null;
  }

  async deleteMany(filter: FindOptionsWhere<FilmEntity>): Promise<boolean> {
    const films = await this.filmRepository.find({
      where: filter,
      relations: ['schedule'],
    });
    if (films.length > 0) {
      const ids = films.map((film) => film.id);
      const result = await this.filmRepository.delete(ids);
      return result.affected !== 0;
    }
    return false;
  }
}
