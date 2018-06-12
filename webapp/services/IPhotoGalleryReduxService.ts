import { IPagination } from "@photos";

export interface IPhotoGalleryReduxService {
  loadPhotos(filter: IPagination): Promise<void>;
}