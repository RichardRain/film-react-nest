import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { GetFullFilmDTO, GetScheduleDTO } from './dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const scheduleMock: GetScheduleDTO = {
    id: '1',
    daytime: '2024-06-30T18:00:53+03:00',
    hall: 2,
    rows: 5,
    seats: 10,
    price: 100,
    taken: [],
  };

  const filmMock: GetFullFilmDTO = {
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        getAllFilms: jest.fn().mockResolvedValue([filmMock]),
        getScheduleByFilmId: jest.fn().mockResolvedValue(scheduleMock),
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  describe('getFilms', () => {
    it('should return an array of films', async () => {
      const result = await controller.getFilms();
      expect(result).toEqual([filmMock]);
      expect(service.getAllFilms).toHaveBeenCalled();
    });
  });

  describe('getFilmById', () => {
    it('should return a schedule by id', async () => {
      const result = await controller.getFilmById(filmMock.id);
      expect(result).toEqual(scheduleMock);
      expect(service.getScheduleByFilmId).toHaveBeenCalledWith(filmMock.id);
    });
  });
});
