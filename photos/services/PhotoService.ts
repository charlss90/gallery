import { IPhotoService, IPagination, IPhotoPagination } from "@photos";
import { HttpRequest, ArgumentError } from "@common";
import { FilterValidtorService } from "@photos/services";

export class PhotoService implements IPhotoService {
  constructor(
    private readonly apiHost: string,
    private readonly httpRequest: HttpRequest,
    private readonly filterValidator: FilterValidtorService) {
  }

  async getAllImagesAsync(filter: IPagination): Promise<IPhotoPagination> {
    // DRY
    this.filterValidator.validate(filter);

    return await this.httpRequest.getAsync<IPhotoPagination>(
      this.buildUrl(filter));
  }

  private buildUrl(filter: IPagination): string {
    return `${this.apiHost}/photos?page=${filter.page}&itemsPerPage=${filter.itemsPerPage}`;
  }
}