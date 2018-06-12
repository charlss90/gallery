import { PhotoGalleryState, PhotoActionEnum, PhotoGalleryAction } from "@webapp/types";
import { photoGalleryReducer } from "@webapp/reducers";
import { expect } from "chai";
import { IPhotoPagination, IPhoto } from "@photos";

describe("[Unit Test] PhotoGalleryReducer", () => {

  const initialState: PhotoGalleryState = {
    fetching: false,
    total: "0",
    totalPages: 0,
    photos: [],
    page: 1,
  };

  it("return initialState when call reducer given and not type and nullable state", () => {
    // Act
    const state = photoGalleryReducer(undefined, {});

    // Assert
    expect(state).to.be.exist;
    expect(state.fetching).to.be.eql(initialState.fetching);
    expect(state.total).to.be.eql(initialState.total);
    expect(state.page).to.be.eql(initialState.page);
    expect(state.totalPages).to.be.eql(initialState.totalPages);
    expect(state.photos).to.be.eql(initialState.photos);
  });

  it("modify state to fetching when call reducer given a FETCH_START", () => {
    // Act
    const state = photoGalleryReducer(initialState, { type: PhotoActionEnum.StartToFetch });

    // Assert
    expect(state).to.be.exist;
    expect(state.fetching).to.be.eql(true);
    expect(state.total).to.be.eql(initialState.total);
    expect(state.totalPages).to.be.eql(initialState.totalPages);
    expect(state.photos).to.be.eql(initialState.photos);
  });

  it("modify state to fetch successfully when call reducer given a FETCH_SUCCESS", () => {
    // Arrange
    const photo: IPhoto = {
      description: "",
      urls: {
        large: { height: 0, width: 0, url: "" },
        medium: { height: 0, width: 0, url: "" },
        small: { height: 0, width: 0, url: "" },
      },
      id: "1",
    };
    const page = 1;
    const payload: IPhotoPagination = { photos: [photo, photo], total: "0", totalPages: 1 };
    const action: PhotoGalleryAction = { page, payload, type: PhotoActionEnum.FetchSuccess };

    // Act
    const state = photoGalleryReducer(initialState, action);

    // Assert
    expect(state).to.be.exist;
    expect(state.fetching).to.be.false;
    expect(state.totalPages).to.be.eql(payload.totalPages);
    expect(state.total).to.be.eql(payload.total);
    expect(state.page).to.be.eql(page + 1);
    expect(state.photos).to.be.exist;
    expect(state.photos).is.instanceOf(Array);
    expect(state.photos.length).to.be.eql(payload.photos.length);
  });

  it(
    "modify state to fetch successfully and increment photos \
    when call reducer given a FETCH_SUCCESS",
    () => {
      // Arrange
      const photo: IPhoto = {
        description: "",
        urls: {
          large: { height: 0, width: 0, url: "" },
          medium: { height: 0, width: 0, url: "" },
          small: { height: 0, width: 0, url: "" },
        },
        id: "1",
      };
      const page = 1;
      const payload: IPhotoPagination = { photos: [photo, photo], total: "0", totalPages: 2 };
      const action: PhotoGalleryAction = { page, payload, type: PhotoActionEnum.FetchSuccess };

      // Act
      let state = photoGalleryReducer(initialState, action);
      state = photoGalleryReducer(state, action);

      // Assert
      expect(state).to.be.exist;
      expect(state.fetching).to.be.false;
      expect(state.totalPages).to.be.eql(payload.totalPages);
      expect(state.total).to.be.eql(payload.total);
      expect(state.photos).to.be.exist;
      expect(state.page).to.be.eql(page + 2);
      expect(state.photos).is.instanceOf(Array);
      expect(state.photos.length).to.be.eql(payload.photos.length * 2);
    });

  it("modify state to unfetching when call reducer given a FETCH_ERROR", () => {
    // Act
    const state = photoGalleryReducer(initialState, { type: PhotoActionEnum.FetchError });

    // Assert
    expect(state).to.be.exist;
    expect(state.fetching).to.be.eql(false);
    expect(state.total).to.be.eql(initialState.total);
    expect(state.totalPages).to.be.eql(initialState.totalPages);
    expect(state.photos).to.be.eql(initialState.photos);
    expect(state.page).to.be.eql(initialState.page);
  });
});