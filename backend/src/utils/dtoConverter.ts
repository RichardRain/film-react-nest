import { plainToInstance } from 'class-transformer';

export function convertToDTO<T>(dbObject: any, dtoClass: new () => T): T {
  const plainObject = dbObject['_doc'] || dbObject;
  return plainToInstance(dtoClass, plainObject, {
    excludeExtraneousValues: true,
  });
}
