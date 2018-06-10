import { expect } from "chai";
import { FlickrService } from "@flickr";
import { mock } from "sinon";
import { IPagination, FilterValidtorService } from "@photos";
import { ArgumentError, HttpRequest, HttpError } from "@common";
import request from "request";

describe("[Unit Test] FlickrService: getAllImagesAsync", () => {
  let photoService: FlickrService;
  const httpRequest = new HttpRequest(request);
  const requestMock = mock(httpRequest);
  const apiKey = "any";
  const validFilter: IPagination = { itemsPerPage: 1, page: 1 };
  const filterValidtorService = new FilterValidtorService();

  before(() => {
    photoService = new FlickrService(apiKey, httpRequest, filterValidtorService);
  });

  it("throw exception when initilize given a empty api key", () => {
    expect(() => new FlickrService("", httpRequest, filterValidtorService)).to.throw(Error);
  });

  // tslint:disable-next-line:max-line-length
  it("throw HttpError when try getAllImagesAsync given a throw error from request error", (done) => {
    // Arrange
    const httpError = new HttpError("Unexpected error while get data", { statusCode: 500 });
    requestMock.expects("getAsync").throwsException(httpError);

    // Act
    photoService.getAllImagesAsync(validFilter)
      // Assert
      .then((response) => {
        done(new Error("Unexpected result"));
      }).catch((ex) => {
        expect(ex).to.instanceOf(HttpError);
        expect(ex.status).to.be.equal(500);
        done();
      });
  });

  // tslint:disable-next-line:max-line-length
  it("throw Error when try getAllImagesAsync given a throw error from request error", (done) => {
    // Arrange
    const error = new Error("Unexpected error while get data");
    requestMock.expects("getAsync").throwsException(error);

    // Act
    photoService.getAllImagesAsync(validFilter)
      // Assert
      .then((response) => {
        done(new Error("Unexpected result"));
      }).catch((ex) => {
        expect(ex).to.instanceOf(Error);
        done();
      });
  });

  it("throw ArgumentError when try getAllImagesAsync given a invalid page", (done) => {
    // Arrange
    const invalidFilter: IPagination = { itemsPerPage: 20, page: -1 };

    // Act
    photoService.getAllImagesAsync(invalidFilter)
      // Assert
      .then((response) => {
        done(new Error("Unexpected result"));
      }).catch((ex: Error) => {
        expect(ex).to.instanceOf(ArgumentError);
        expect(ex.message).to.be.equal("Unexpected Argument: page must be bigger than 0");
        done();
      });
  });

  it("throw ArgumentError when try getAllImagesAsync given a invalid itemsPerPage", (done) => {
    // Arrange
    const invalidFilter: IPagination = { itemsPerPage: -20, page: 1 };

    // Act
    photoService.getAllImagesAsync(invalidFilter)
      // Assert
      .then((response) => {
        done(new Error("Unexpected result"));
      }).catch((ex: Error) => {
        try {
          expect(ex).to.instanceOf(ArgumentError);
          expect(ex.message).to.be.equal("Unexpected Argument: itemsPerPage must be bigger than 0");
          done();
        } catch (ex) {
          done(ex);
        }
      });
  });

  it("throw Error when getAllImagesAsync given a null response", (done) => {
    // Arrange
    requestMock.expects("getAsync").returns(null);

    // Act
    photoService.getAllImagesAsync(validFilter)
      // Assert
      .then((response) => {
        done(new Error("Unexpected behavior"));
      }).catch((error) => {
        try {
          expect(error).to.be.instanceOf(Error);
          expect(error.message).to.be.equal("Unexpected error: response is missing");
          done();
        } catch (ex) {
          done(ex);
        }
      });
  });

  it("throw Error when getAllImagesAsync given a empty response", (done) => {
    // Arrange
    requestMock.expects("getAsync").returns({});

    // Act
    photoService.getAllImagesAsync(validFilter)
      // Assert
      .then((response) => {
        done(new Error("Unexpected behavior"));
      }).catch((error) => {
        try {
          expect(error).to.be.instanceOf(Error);
          expect(error.message).to.be.equal("Unexpected error: provider fails");
          done();
        } catch (ex) {
          done(ex);
        }
      });
  });

  it("throw Error when getAllImagesAsync given a empty photos", (done) => {
    // Arrange
    requestMock.expects("getAsync").returns({});

    // Act
    photoService.getAllImagesAsync(validFilter)
      // Assert
      .then((response) => {
        done(new Error("Unexpected behavior"));
      }).catch((error) => {
        try {
          expect(error).to.be.instanceOf(Error);
          expect(error.message).to.be.equal("Unexpected error: provider fails");
          done();
        } catch (ex) {
          done(ex);
        }
      });
  });

  it("return empty response when getAllImagesAsync given a photos empty object", async () => {
    // Arrange
    requestMock.expects("getAsync").returns({ stat: "ok", photos: {} });

    // Act
    const response = await photoService.getAllImagesAsync(validFilter);

    // Assert
    expect(response).to.be.exist;
    expect(response.total).to.be.exist;
    expect(response.total).to.equal("0");
    expect(response.totalPages).to.be.exist;
    expect(response.totalPages).to.equal(0);
    expect(response.photos).to.be.exist;
    expect(response.photos).to.be.empty;
  });

  it("return photos when getAllImagesAsync given valid async response", async () => {
    // Arrange
    const photos = {
      total: 1,
      pages: 1,
      photo: [{
        id: "id",
        description: "Any description",
        url_l: "url_l",
        url_m: "url_m",
        url_s: "url_s",
        width_l: "width_l",
        width_m: "width_m",
        width_s: "width_s",
        height_l: "height_l",
        height_m: "height_m",
        height_s: "height_s",
      }],
    };
    requestMock.expects("getAsync").returns({
      photos,
      stat: "ok",
    });

    // Act
    const response = await photoService.getAllImagesAsync(validFilter);

    // Assert
    expect(response).to.be.exist;
    expect(response.total).to.be.exist;
    expect(response.total).to.equal(photos.total);
    expect(response.totalPages).to.be.exist;
    expect(response.totalPages).to.equal(photos.pages);
    expect(response.photos).to.be.exist;
    expect(response.photos).to.be.length(photos.photo.length);
  });
});