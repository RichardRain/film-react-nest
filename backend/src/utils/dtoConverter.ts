export function convertToDTO<T>(dbObject: any): T {
  // Удаляем поле _id из объекта, так как оно не должно быть в DTO, eslint не пропускает с неиспользуюмщейся переменной
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...filteredObject } = dbObject['_doc'];
  return filteredObject as T;
}
