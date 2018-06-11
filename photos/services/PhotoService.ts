import { IPhotoService, IPagination, IPhotoPagination } from "@photos";
import { HttpRequest, ArgumentError, HttpError } from "@common";
import { FilterValidatorService } from "@photos/services";
import { create, ApisauceInstance } from "apisauce";

export class PhotoService implements IPhotoService {

  private api: ApisauceInstance;

  constructor(
    private readonly apiURL: URL,
    private readonly filterValidator: FilterValidatorService) {
    this.api = create({ baseURL: apiURL.origin });
  }

  async getAllImagesAsync(filter: IPagination): Promise<IPhotoPagination> {
    // DRY
    this.filterValidator.validate(filter);

    const response = await this.api.get<IPhotoPagination>("photos", filter);

    if (!response.ok) {
      throw new HttpError(`${response.data || "Unexpected reponse"}`, response);
    }

    return response.data || { photos: [], total: "0", totalPages: 0 };
  }
}