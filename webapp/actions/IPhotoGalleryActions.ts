import { IPhotoPagination } from "@photos";
import { PhotoGalleryAction } from "@webapp/types";

export interface IPhotoGalleryActions {
  startFetchPhotos(): Promise<void>;

  successFetchPhotos(payload: IPhotoPagination): Promise<void>;

  errorFetchPhotos(): Promise<void>;
}