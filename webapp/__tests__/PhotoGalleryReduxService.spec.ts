import { FilterValidatorService, PhotoService, IPhotoPagination } from "@photos";
import { PhotoGalleryActions } from "@webapp/actions/PhotoGalleryActions";
import { IPhotoGalleryReduxService } from "@webapp/services/IPhotoGalleryReduxService";
import { PhotoGalleryReduxService } from "@webapp/services";
import { spy, stub } from "sinon";
import { expect } from "chai";
import { storeMock } from "@webapp/__tests__/Mocks";

describe("[Unit Test] PhotoGalleryReduxService: loadPhotos", () => {
  const photoGalleryActions = new PhotoGalleryActions(storeMock);
  const startFetchSpy = spy(photoGalleryActions, "startFetchPhotos");
  const successFetchSpy = spy(photoGalleryActions, "successFetchPhotos");
  const errorFetchSpy = spy(photoGalleryActions, "errorFetchPhotos");

  const apiURL = "http://myhost.com";
  const filterValidatorService = new FilterValidatorService();
  const photoServiceMock = stub(new PhotoService(apiURL, filterValidatorService));

  let photoGalleryReduxService: IPhotoGalleryReduxService;

  before(() => {
    photoGalleryReduxService = new PhotoGalleryReduxService(
      photoGalleryActions,
      photoServiceMock);
  });

  afterEach(() => {
    startFetchSpy.resetHistory();
    successFetchSpy.resetHistory();
    errorFetchSpy.resetHistory();
    photoServiceMock.getAllImagesAsync.resetBehavior();
    photoServiceMock.getAllImagesAsync.resetHistory();
  });

  it("call errorFetchPhotos when loadPhotos given a throw error from IPhotoService", async () => {
    // Arrange
    photoServiceMock.getAllImagesAsync.throws(new Error());

    // Act
    await photoGalleryReduxService.loadPhotos({ page: 1, itemsPerPage: 1 });

    // Assert
    expect(startFetchSpy.called).to.be.true;
    expect(successFetchSpy.notCalled).to.be.true;
    expect(errorFetchSpy.calledOnce).to.be.true;
  });

  it("call successFetchPhotos when loadPhotos given a throw error from IPhotoService", async () => {
    // Arrange
    const payload: IPhotoPagination = { totalPages: 1, total: "1", photos: [] };
    const promiseReturn = new Promise(resolve => resolve(payload));
    photoServiceMock.getAllImagesAsync.returns(promiseReturn);

    // Act
    await photoGalleryReduxService.loadPhotos({ page: 1, itemsPerPage: 1 });

    // Assert
    expect(startFetchSpy.calledOnce).to.be.true;
    expect(successFetchSpy.calledOnce).to.be.true;
    expect(successFetchSpy.calledWith(payload)).to.be.true;
    expect(errorFetchSpy.notCalled).to.be.true;
  });
});