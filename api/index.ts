import { FlickrService } from "@flickr";
import { PhotosRouter } from "@api/routes";
import { ApiFactory } from "@api";
import { Router } from "express";
import { HttpRequest } from "@common";

export { ApiFactory } from "@api/factories";
export { PhotosRouter } from "@api/routes";
import request from "request";
import { FilterValidtorService } from "@photos";

export const createFlickrApi = (apiKey: string) => {
  const photosService = new FlickrService(
    apiKey,
    new HttpRequest(request),
    new FilterValidtorService());
  const router = Router();

  new PhotosRouter(photosService).use(router);
  return ApiFactory.create(router);
};