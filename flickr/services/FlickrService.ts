import {
  IFlickrPaginationResponse,
  IFlickrFilter,
  IFlickrResponse,
} from "@flickr/contracts";
import { IPagination, IPhotoPagination, IPhotoFeatures } from "@photos";
import { IRequest, ArgumentError } from "@common";

export class FlickrService {

  private readonly baseURL: string = "https://api.flickr.com/services/rest";

  constructor(private apiKey: string, private request: IRequest) {
    if (apiKey.length === 0) {
      throw new Error("Unexpected apiKey, please specifiy");
    }
  }

  async getAllImagesAsync(filter: IPagination): Promise<IPhotoPagination> {
    this.assertFilter(filter);
    const response = await this.request.getAsync<IFlickrResponse>(this.baseURL, {
      qs: this.createFlickrFilter(filter),
    });

    const photos = this.assertOrGetPhotos(response);

    return {
      total: photos.total || "0",
      totalPages: photos.pages || 0,
      photos: (photos.photo || []).filter(x => !!x).map(x => ({
        description: (x.description && x.description).__content || "",
        id: x.id || "",
        urls: {
          large: this.toPhotoFeatures(x.url_l, x.width_l, x.height_l),
          medium: this.toPhotoFeatures(x.url_m, x.width_m, x.height_m),
          small: this.toPhotoFeatures(x.url_s, x.width_s, x.height_s),
        },
      })),
    };
  }

  private assertFilter(filter: IPagination) {
    if (!filter.page || filter.page <= 0) {
      throw new ArgumentError("Unexpected Argument: page must be bigger than 0");
    }
    if (!filter.itemsPerPage || filter.itemsPerPage <= 0) {
      throw new ArgumentError("Unexpected Argument: itemsPerPage must be bigger than 0");
    }
  }

  private createFlickrFilter(filter: IPagination): IFlickrFilter {
    return {
      api_key: this.apiKey,
      content_type: 7,
      extras: "description,rotation,url_c,url_l,url_m,url_n,url_q,url_s,url_sq,url_t,url_z",
      format: "json",
      lang: "en-US",
      method: "flickr.photos.search",
      sort: "relevance",
      nojsoncallback: 1,
      page: filter.page,
      per_page: filter.itemsPerPage,
    };
  }

  private toPhotoFeatures(
    url: string = "",
    width: string = "",
    height: string = ""): IPhotoFeatures {
    return {
      url,
      width: parseInt(width, undefined) || 0,
      height: parseInt(height, undefined) || 0,
    };
  }

  private assertOrGetPhotos(response: IFlickrResponse): IFlickrPaginationResponse {
    let photos: IFlickrPaginationResponse | undefined;
    if (!response) {
      throw new Error("Unexpected error: response is missing");
    }
    if (response.stat !== "ok") {
      throw new Error(response.message || "Unexpected error: provider fails");
    }
    photos = response.photos;
    if (!photos) {
      throw new Error("Unexpected error: provider return empty photos");
    }
    return photos;
  }
}