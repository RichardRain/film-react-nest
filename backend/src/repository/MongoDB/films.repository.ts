import { Injectable } from '@nestjs/common';
import { EntityRepository } from './entity.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../../films/schemas/films.schema';

@Injectable()
export class MongoFilmsRepository extends EntityRepository<FilmDocument> {
  constructor(@InjectModel(Film.name) filmModel: Model<FilmDocument>) {
    super(filmModel);
  }
}
