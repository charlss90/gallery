import { IFlickrPaginationResponse } from "./IFlickrPaginationResponse";

export interface IFlickrResponse {
  photos?: IFlickrPaginationResponse;
  stat: "ok" | "fail";
  code?: number;
  message?: string;
}