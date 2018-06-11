import { IAction, PhotoActionEnum } from "@webapp/types";
import { IPhotoPagination } from "@photos";

export interface PhotoGalleryAction extends IAction<PhotoActionEnum> {
  payload?:IPhotoPagination;
  error?: Error;
}