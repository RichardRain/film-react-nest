import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { PostgresFilmsRepository } from '../repository/PostgreSQL/films.repository';
import {
  GetFilmsResponse,
  GetFilmDTO,
  GetFullFilmDTO,
  GetScheduleDTO,
  GetScheduleResponse,
} from './dto/films.dto';

describe('FilmsService', () => {
  let service: FilmsService;
  let repository: PostgresFilmsRepository;

  const scheduleMock: GetScheduleDTO = {
    id: '1',
    daytime: '2024-06-30T18:00:53+03:00',
    hall: 2,
    rows: 5,
    seats: 10,
    price: 100,
    taken: [],
  };

  const filmMock: GetFilmDTO = {
    id: '2',
    rating: 2.9,
    director: 'Итан Райт',
    tags: ['Документальный'],
    image: '/bg1s.jpg',
    cover: '/bg1c.jpg',
    title: 'Архитекторы общества',
    about: 'Документальный фильм',
    description: 'Документальный фильм',
  };

  const fullFilmMock: GetFullFilmDTO = {
    id: '2',
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

  const filmResponseMock: GetFilmsResponse = {
    items: [filmMock],
    total: 1,
  };

  const scheduleResponseMock: GetScheduleResponse = {
    items: [scheduleMock],
    total: 1,
  };
  beforeEach(async () => {
    repository = {
      find: jest.fn().mockResolvedValue([filmMock]),
      findOne: jest.fn().mockResolvedValue(fullFilmMock),
    } as unknown as PostgresFilmsRepository;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: 'FILMS_REPOSITORY',
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  describe('getAllFilms', () => {
    it('should return an array of films', async () => {
      const result = await service.getAllFilms();
      expect(result).toEqual(filmResponseMock);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('getScheduleByFilmId', () => {
    it('should return a schedule by id', async () => {
      const result = await service.getScheduleByFilmId(fullFilmMock.id);
      expect(result).toEqual(scheduleResponseMock);
      expect(repository.findOne).toHaveBeenCalledWith({ id: fullFilmMock.id });
    });
  });
});
