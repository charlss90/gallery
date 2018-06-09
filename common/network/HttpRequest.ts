import { IRequest } from "@common/contracts";
import { CoreOptions, get, Response } from "request";
import { HttpError, HttpStatusCode } from "@common/network";

export class HttpRequest implements IRequest {

  getAsync<T>(uri: string, options: CoreOptions): Promise<T> {
    return new Promise((resolve, reject) => {
      get(uri, { ...options, json: true }, (error, response, body) => {
        try {
          this.assertResponse(error, response, body);
          resolve(body);
        } catch (ex) {
          reject(ex);
        }
      });
    });
  }

  private assertResponse(error: any, response: Response, body: any) {
    if (error) {
      this.throwError(error);
    }
    if (response.statusCode !== HttpStatusCode.OK) {
      this.throwHttpError(body, response);
    }
  }

  private throwHttpError(body: any, response: Response) {
    let message: string = "Unexpected error while get data";
    if (!!body) {
      message = JSON.stringify(body);
    }
    throw new HttpError(message, response);
  }

  private throwError(error: any) {
    let err: Error;
    try {
      if (!(error instanceof Error)) {
        err = new Error(JSON.stringify(error));
      } else {
        err = error;
      }
    } catch (ex) {
      err = ex;
    }
    throw err;
  }
}