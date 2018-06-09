import { FlickrService, HttpRequest } from "@flickr";
import { PhotosRouter } from "@api/routes";
import { ApiFactory } from "@api";
import { Router } from "express";

export { ApiFactory } from "@api/factories";
export { PhotosRouter } from "@api/routes";

export const createFlickrApi = (apiKey: string) => {
  const photosService = new FlickrService(apiKey, new HttpRequest());
  const router = Router();

  new PhotosRouter(photosService).use(router);
  return ApiFactory.create(router);
};