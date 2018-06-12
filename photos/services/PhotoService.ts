import { IPhotoService, IPagination, IPhotoPagination } from "@photos";
import { HttpRequest, ArgumentError, HttpError } from "@common";
import { FilterValidatorService } from "@photos/services";
import { create, ApisauceInstance } from "apisauce";

export class PhotoService implements IPhotoService {

  private readonly validURI = new RegExp(
    /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/,
    "i");
  private api: ApisauceInstance;

  constructor(
    private readonly apiURL: string,
    private readonly filterValidator: FilterValidatorService) {
    this.assertURI(this.apiURL);
    this.api = create({ baseURL: apiURL });
  }

  private assertURI(uri: string) {
    if (!this.validURI.test(uri)) {
      throw new TypeError("Invalid URI");
    }
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