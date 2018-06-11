import { IPagination } from "@photos";
import { ArgumentError } from "@common";

export class FilterValidatorService {
  validate(filter: IPagination) {
    if (!filter.page || filter.page <= 0) {
      throw new ArgumentError("Unexpected Argument: page must be bigger than 0");
    }
    if (!filter.itemsPerPage || filter.itemsPerPage <= 0) {
      throw new ArgumentError("Unexpected Argument: itemsPerPage must be bigger than 0");
    }
  }
}