export function convertToDTO<T>(dbObject: T): T {
  const { _id, ...filteredObject} = dbObject['_doc'];
  return { ...filteredObject }
}
