import { IAction, PhotoGalleryAction, PhotoGalleryState, PhotoActionEnum } from "@webapp/types";
import { IPhotoPagination, IPhoto } from "@photos";

const initialState: PhotoGalleryState = {
  fetching: false,
  total: "0",
  totalPages: 0,
  photos: [],
};

export function photoGalleryReducer(
  state: PhotoGalleryState = initialState,
  action: PhotoGalleryAction): PhotoGalleryState {
  try {
    const { type, error, payload } = action;
    switch (type) {
      case PhotoActionEnum.StartToFetch:
        return {
          ...state,
          fetching: true,
        };

      case PhotoActionEnum.FetchSuccess:
        let { photos, total, totalPages } = state;

        if (payload) {
          if (payload.photos && payload.photos.length > 0) {
            photos = [...photos, ...payload.photos];
          }
          if (payload.total && payload.total.length > 0) {
            total = payload.total;
          }
          if (payload.totalPages > 0) {
            totalPages = payload.totalPages;
          }
        }

        return {
          photos,
          totalPages,
          total,
          fetching: false,
        };

      case PhotoActionEnum.FetchError:
        return {
          ...state,
          fetching: false,
        };

      default:
        return state;
    }
  } catch (ex) {
    return state;
  }
}