import { FindOptionsWhere } from 'typeorm';
import { FilterQuery } from 'mongoose';

export interface CommonFilmsRepository<T> {
  findOne(filter: FilterQuery<T> | FindOptionsWhere<T>): Promise<T | null>;
  find(filter?: FilterQuery<T> | FindOptionsWhere<T>): Promise<T[]>;
  create(createData: Partial<T>): Promise<T>;
  findOneAndUpdate(
    filter: FilterQuery<T> | FindOptionsWhere<T>,
    updateData: UpdateAction<T>,
  ): Promise<T | null>;
  deleteMany(filter: FilterQuery<T> | FindOptionsWhere<T>): Promise<boolean>;
}

export interface UpdateAction<T> {
  set?: Partial<T>;
}
