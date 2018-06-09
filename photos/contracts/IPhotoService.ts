import { IPagination, IPhotoPagination } from ".";

export interface IPhotoService {
  getAllImagesAsync(filter: IPagination): Promise<IPhotoPagination>;
}