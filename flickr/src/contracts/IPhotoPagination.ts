import { IPhoto } from "./IPhoto";

export interface IPhotoPagination {
  totalPages: number;
  total: string;
  photos: IPhoto[]
}