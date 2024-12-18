export function convertToDTO<T>(dbObject: any): T {
  const { ...filteredObject } = dbObject['_doc'];
  delete filteredObject['_id'];
  return filteredObject as T;
}
