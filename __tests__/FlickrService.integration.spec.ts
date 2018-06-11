import { expect } from "chai";
import { FlickrService } from "@flickr";
import { IPagination, FilterValidatorService } from "@photos";
import { HttpRequest } from "@common";
import request from "request";

describe("[Integration] FlickService: getAllImagesAsync", () => {
  let flickrService: FlickrService;
  const apiKey: string = "59e9561e02d8a39f946bc73f01d4d6d1";

  before(() => {
    flickrService = new FlickrService(
      apiKey,
      new HttpRequest(request),
      new FilterValidatorService());
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
    photoPagination.photos.forEach((photo) => {
      expect(photo).not.to.be.undefined;
      expect(photo.id).not.to.be.undefined;
      expect(photo.id.length).greaterThan(0);
      expect(photo.urls).not.to.be.undefined;
      expect(photo.urls.large).not.to.be.undefined;
      expect(photo.urls.large.url).not.to.be.undefined;
      expect(photo.urls.medium).not.to.be.undefined;
      expect(photo.urls.medium.url).not.to.be.undefined;
      expect(photo.urls.small).not.to.be.undefined;
      expect(photo.urls.small.url).not.to.be.undefined;
    });
  });
});