import { IFlickrPhoto } from "./IFlickrPhoto";

export interface IFlickrPaginationResponse {
  page: number;
  pages: number;
  perpage: number;
  total: string;
  photo: IFlickrPhoto[];
}