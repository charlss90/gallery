import { expect } from "chai";
import { FlickrService } from "@src/services";
import { HttpRequest } from "@src/network";
import { IPagination, IPhotoPagination } from "@src/contracts";

describe("FlickService getAllImagesAsync", () => {
  let flickrService: FlickrService;
  const apiKey: string = "59e9561e02d8a39f946bc73f01d4d6d1";

  before(() => {
    flickrService = new FlickrService(apiKey, new HttpRequest());
  });

  it("get photos when try get images given a page 1 and 20 per page", async () => {
    // Arrange
    const filter: IPagination = { itemsPerPage: 20, page: 1 };

    // Act
    const photoPagination = await flickrService.getAllImagesAsync(filter);

    // Assert
    expect(photoPagination).not.to.be.undefined;
    expect(photoPagination.total).not.to.be.undefined;
    expect(photoPagination.totalPages).greaterThan(0);
    expect(photoPagination.photos).not.to.be.undefined;
    expect(photoPagination.photos.length).to.be.equal(20);
  });
});