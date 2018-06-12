import { FlickrService } from "@flickr";
import { PhotosRouter } from "@api/routes";
import { ApiFactory } from "@api";
import { Router, Express } from "express";
import { HttpRequest } from "@common";

export { ApiFactory } from "@api/factories";
export { PhotosRouter } from "@api/routes";
import request from "request";
import { FilterValidatorService } from "@photos";

export const createFlickrApi = (apiKey: string) => {
  return ApiFactory.create(createRouter(apiKey));
};

export const injectFlickr = (apiKey: string, app: Express) => {
  return ApiFactory.injectApp(
    createRouter(apiKey),
    app);
};

function createRouter(apiKey: string) {
  const photosService = new FlickrService(
    apiKey,
    new HttpRequest(request),
    new FilterValidatorService());
  const router = Router();
  new PhotosRouter(photosService).use(router);
  return router;
}
