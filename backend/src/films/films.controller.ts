import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('/')
  getFilms() {
    return this.filmsService.getAllFilms();
  }

  @Get('/:id/schedule')
  getFilmById(@Param('id') id: string) {
    return this.filmsService.getScheduleByFilmId(id);
  }
}
