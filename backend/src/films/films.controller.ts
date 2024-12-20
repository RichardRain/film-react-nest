import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { GetFilmsResponse, GetScheduleResponse } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  getFilms(): Promise<GetFilmsResponse> {
    return this.filmsService.getAllFilms();
  }

  @Get('/:id/schedule')
  getFilmById(@Param('id') id: string): Promise<GetScheduleResponse> {
    return this.filmsService.getScheduleByFilmId(id);
  }
}
