import { CoreOptions } from "request";

export interface IRequest {
  getAsync<T>(uri: string, options?: CoreOptions): Promise<T>;
}