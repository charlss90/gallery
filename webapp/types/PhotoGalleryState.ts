import { IPhotoPagination, IPhoto } from "@photos";

export interface PhotoGalleryState {
  fetching: boolean;
  totalPages: number;
  total: string;
  photos: IPhoto[];
  page: number;
}