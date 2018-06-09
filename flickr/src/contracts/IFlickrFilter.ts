export interface IFlickrFilter {
  sort?: string;
  content_type?: number;
  extras?: string;
  per_page?: number;
  page?: number;
  lang?: string;
  method: string;
  api_key: string;
  format: string;
  nojsoncallback: 1 | 0;
}