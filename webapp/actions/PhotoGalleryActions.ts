import { Store, Dispatch } from "redux";
import { IPhotoGalleryActions } from "./IPhotoGalleryActions";
import { PhotoActionEnum, AppState } from "@webapp/types";
import { IPhotoPagination } from "@photos";
import { StoreService } from "@webapp/services";

export class PhotoGalleryActions implements IPhotoGalleryActions {
  private static photoGalleryActions: PhotoGalleryActions;

  static getSingletonInstance(): PhotoGalleryActions {
    if (!this.photoGalleryActions) {
      this.photoGalleryActions = new PhotoGalleryActions(StoreService.getSingletonInstance().store);
    }
    return this.photoGalleryActions;
  }

  constructor(private readonly store: Store<AppState>) {
  }

  private get dispatch(): Dispatch {
    return this.store.dispatch;
  }

  async startFetchPhotos() {
    await this.dispatch({ type: PhotoActionEnum.StartToFetch });
  }

  async successFetchPhotos(payload: IPhotoPagination): Promise<void> {
    this.validatePayload(payload);
    await this.dispatch({ payload, type: PhotoActionEnum.FetchSuccess });
  }

  private validatePayload(payload: IPhotoPagination) {
    if (!payload.total || payload.totalPages < 0) {
      throw new TypeError("Invalid Payload: total or totalPages is incorrect");
    }
  }

  async errorFetchPhotos() {
    await this.dispatch({ type: PhotoActionEnum.FetchError });
  }

}