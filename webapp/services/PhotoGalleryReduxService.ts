import { IPhotoService, IPagination } from "@photos";
import { IPhotoGalleryActions } from "@webapp/actions";
import { IPhotoGalleryReduxService } from "@webapp/services";

export class PhotoGalleryReduxService implements IPhotoGalleryReduxService {

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