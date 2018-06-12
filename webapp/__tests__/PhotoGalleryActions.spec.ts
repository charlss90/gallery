import { expect } from "chai";
import { stub } from "sinon";
import { PhotoGalleryActions } from "@webapp/actions/PhotoGalleryActions";
import { PhotoActionEnum } from "@webapp/types";
import { IPhotoPagination } from "@photos";

describe("[Unit Test] PhotoGalleryActions", () => {
  const dispatch = stub();

  const invalidPayload: IPhotoPagination = { photos: [], total: "", totalPages: -1 };
  const validPayload: IPhotoPagination = { photos: [], total: "0", totalPages: 1 };
  const photoGalleryActions = new PhotoGalleryActions(dispatch);

  afterEach(() => {
    dispatch.resetHistory();
  });

  it("call distach with {type: PhotoActionEnum.StartToFetch} when startFetchPhotos", () => {

    // Act
    photoGalleryActions.startFetchPhotos();

    // Assert
    expect(dispatch.calledOnce).to.be.true;
    expect(dispatch.calledWith({ type: PhotoActionEnum.StartToFetch }));
  });

  it("throw TypeError when startFetchPhotos given invalid payload", (done) => {

    // Act
    photoGalleryActions.successFetchPhotos(invalidPayload)
      .then(() => done(new Error("Unexpected Behavior")))
      .catch((ex) => {
        try {
          expect(ex).to.be.exist;
          expect(ex).to.be.instanceOf(TypeError);
          expect(dispatch.notCalled).to.be.true;
          done();
        } catch (ex) {
          done(ex);
        }
      });
  });

  it(
    "call dispatch with { type:FetchSuccess, validPayload } \
    when startFetchPhotos given invalid payload",
    () => {

      // Act
      photoGalleryActions.successFetchPhotos(validPayload);

      // Assert
      expect(dispatch.calledOnce).to.be.true;
      expect(dispatch.calledWith({
        type: PhotoActionEnum.FetchSuccess,
        payload: validPayload,
      })).to.be.true;
    });

  it(
    "call dispatch { type:FetchError } \
    with when errorFetchPhotos given invalid payload",
    () => {

      // Act
      photoGalleryActions.errorFetchPhotos();

      // Assert
      expect(dispatch.calledOnce).to.be.true;
      expect(dispatch.calledWith({
        type: PhotoActionEnum.FetchError,
      })).to.be.true;
    });
});