import { Router, Request, NextFunction, Response } from "express";
import { IPhotoService, IPagination } from "@photos";
import { BadRequest } from "@api/errors";

export class PhotosRouter {
  constructor(private photoService: IPhotoService) {
  }

  use(router: Router) {
    router.get("/photos", this.get);
  }

  private get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter: IPagination = req.query || { itemsPerPage: 20, page: 1 };
      if (!filter.page || filter.page < 0) {
        throw new BadRequest("Unexpected params: page must be bigger than 0");
      }
      if (!filter.itemsPerPage || filter.itemsPerPage < 0 || filter.itemsPerPage > 50) {
        throw new BadRequest("Unexpected params: itemsPerPage must\
         be greater than 0 and less than 50");
      }

      res.json(await this.photoService.getAllImagesAsync(filter));
    } catch (ex) {
      next(ex);
    }
  }
}
