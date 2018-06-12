import { PhotoGalleryAction, PhotoGalleryState, PhotoActionEnum } from "@webapp/types";

const initialState: PhotoGalleryState = {
  fetching: false,
  total: "0",
  totalPages: 0,
  page: 1,
  photos: [],
};

export function photoGalleryReducer(
  state: PhotoGalleryState = initialState,
  action: PhotoGalleryAction): PhotoGalleryState {
  try {
    const { type, payload } = action;
    switch (type) {
      case PhotoActionEnum.StartToFetch:
        return {
          ...state,
          fetching: true,
        };

      case PhotoActionEnum.FetchSuccess:
        let { photos, total, totalPages, page } = state;

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
        page += 1;

        return {
          photos,
          totalPages,
          total,
          page,
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