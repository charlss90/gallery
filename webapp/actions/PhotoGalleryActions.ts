import { Dispatch } from "redux";
import { IPhotoGalleryActions } from "./IPhotoGalleryActions";
import { PhotoActionEnum } from "@webapp/types";
import { IPhotoPagination } from "@photos";

export class PhotoGalleryActions implements IPhotoGalleryActions {

  constructor(private readonly dispatch: Dispatch) {
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