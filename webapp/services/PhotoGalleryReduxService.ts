import { IPhotoService, IPagination, PhotoService } from "@photos";
import { IPhotoGalleryActions } from "@webapp/actions";
import { IPhotoGalleryReduxService } from "@webapp/services";
import { PhotoGalleryActions } from "@webapp/actions/PhotoGalleryActions";

export class PhotoGalleryReduxService implements IPhotoGalleryReduxService {

  private static photoGalleryReduxSerivce: PhotoGalleryReduxService;

  static getSingletonInstance(): PhotoGalleryReduxService {

    if (!this.photoGalleryReduxSerivce) {

      this.photoGalleryReduxSerivce = new PhotoGalleryReduxService(
        PhotoGalleryActions.getSingletonInstance(),
        PhotoService.getSingletonInstance());
    }

    return this.photoGalleryReduxSerivce;
  }

  constructor(
    private readonly photoGalleryActions: IPhotoGalleryActions,
    private readonly photoService: IPhotoService) {
  }

  async loadPhotos(filter: IPagination): Promise<void> {
    try {
      await this.photoGalleryActions.startFetchPhotos();
      const payload = await this.photoService.getAllImagesAsync(filter);
      await this.photoGalleryActions.successFetchPhotos(payload);
    } catch (ex) {
      this.photoGalleryActions.errorFetchPhotos();
    }
  }
}