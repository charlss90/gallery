import { Response } from "request";

export class HttpError extends Error {

  get response(): Response {
    return this.httpReponse;
  }

  get status(): number {
    return this.httpReponse.statusCode || this.httpReponse.status;
  }

  constructor(
    error: string,
    private readonly httpReponse: Response | any) {
    super(error);
  }
}