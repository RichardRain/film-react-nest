import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { CommonFilmsRepository } from '../repositoryInterfaces';

export abstract class EntityRepository<T extends Document>
  implements CommonFilmsRepository<T>
{
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    filter: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel.findOne(filter, { ...projection }).exec();
  }

  async find(
    filter?: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T[]> {
    return this.entityModel.find(filter, { ...projection }).exec();
  }

  async create(createEntityData: Partial<T>): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOneAndUpdate(
    filter: FilterQuery<T>,
    updateData: UpdateQuery<Partial<T>>,
  ): Promise<T | null> {
    return this.entityModel
      .findOneAndUpdate(filter, updateData, { new: true })
      .exec();
  }

  async deleteMany(filter: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(filter);
    return deleteResult.deletedCount >= 1;
  }
}
