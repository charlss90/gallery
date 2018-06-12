import { IPhotoService, PhotoService, FilterValidatorService, IPhotoPagination } from "@photos";
import { HttpStatusCode, HttpError, ArgumentError } from "@common";
import { expect } from "chai";
import nock from "nock";
import { spy } from "sinon";

describe("[Unit Test] PhotoService: getAllImagesAsync", () => {
  let photoService: IPhotoService;
  const apiURL = "http://localhost:3000";

  const queryParamsForInternalError = { itemsPerPage: 1, page: 1 };
  const queryParamsForValidResponse = { itemsPerPage: 2, page: 2 };
  const filterValidatorService = new FilterValidatorService();
  const validateSpy = spy(filterValidatorService, "validate");

  const validResponse: IPhotoPagination = { photos: [], total: "0", totalPages: 0 };

  const nockApi = nock(apiURL);

  before(() => {
    photoService = new PhotoService(apiURL, filterValidatorService);

    nockApi.get("/photos")
      .query(queryParamsForInternalError)
      .reply(500, "Unexpected Error");

    nockApi.get("/photos")
      .query(queryParamsForValidResponse)
      .reply(200, validResponse);
  });

  it("throw TypeError when try initialize given a invalid uri", () => {
    expect(() => new PhotoService("adfa", filterValidatorService)).throw(TypeError);
  });

  it("throw error when try getAllImages given a invalid page param", (done) => {
    // Arrange
    const invalidFilter = { itemsPerPage: 1, page: 0 };

    // Act
    photoService.getAllImagesAsync(invalidFilter)
      // Assert
      .then(() => {
        done(new Error("Unexpected behavior"));
      }).catch((ex) => {
        try {
          expect(validateSpy.called).to.be.true;
          expect(validateSpy.calledWith(invalidFilter)).to.be.true;
          expect(ex).to.be.exist;
          expect(ex).to.be.instanceOf(ArgumentError);
          done();
        } catch (ex) {
          done(ex);
        }
      });
  });

  it("throw error when try getAllImages given a invalid page itemsPerPage", (done) => {
    // Arrange
    const invalidFilter = { itemsPerPage: 0, page: 1 };

    // Act
    photoService.getAllImagesAsync(invalidFilter)
      // Assert
      .then(() => {
        done(new Error("Unexpected behavior"));
      }).catch((ex) => {
        try {
          expect(validateSpy.called).to.be.true;
          expect(validateSpy.calledWith(invalidFilter)).to.be.true;
          expect(ex).to.be.exist;
          expect(ex).to.be.instanceOf(ArgumentError);
          done();
        } catch (ex) {
          done(ex);
        }
      });
  });

  it("throw error when try getAllImagas with invalid response given a valid parameters", (done) => {
    // Act
    photoService.getAllImagesAsync(queryParamsForInternalError)
      // Assert
      .then(() => {
        done(new Error("Unexpected behavior"));
      }).catch((ex) => {
        try {
          expect(validateSpy.called).to.be.true;
          expect(validateSpy.calledWith(queryParamsForInternalError)).to.be.true;
          expect(ex).to.be.exist;
          expect(ex).to.be.instanceOf(HttpError);
          expect(ex.status).to.be.eql(HttpStatusCode.InternalError);
          done();
        } catch (ex) {
          done(ex);
        }
      });
  });

  it("return valid response when try getAllImages given a valid parameters", async () => {
    // Act
    const response = await photoService.getAllImagesAsync(queryParamsForValidResponse);

    // Assert
    expect(validateSpy.called).to.be.true;
    expect(validateSpy.calledWith(queryParamsForValidResponse)).to.be.true;
    expect(response).to.be.exist;
    expect(response.total).to.eql(validResponse.total);
    expect(response.totalPages).to.eql(validResponse.totalPages);
    expect(response.photos).to.eql(validResponse.photos);
  });
});