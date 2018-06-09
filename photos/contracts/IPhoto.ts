import { IPhotoFeatures } from "./IPhotoFeatures";

export interface IPhoto {
  id: string;
  description: string;
  urls: {
    large: IPhotoFeatures,
    medium: IPhotoFeatures,
    small: IPhotoFeatures,
  };
}