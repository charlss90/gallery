import { PhotoGalleryState, PhotoActionEnum } from "@webapp/types";
import { photoGalleryReducer } from "@webapp/reducers";
import { expect } from "chai";

describe("[Unit Test] PhotoGalleryReducer", () => {

  const initialState: PhotoGalleryState = {
    fetching: false,
    total: "0",
    totalPages: 0,
    photos: [],
  };

  it("return initialState when call reducer given and not type and nullable state", () => {
    // Act
    const state = photoGalleryReducer(undefined, {});

    // Assert
    expect(state).to.be.exist;
    expect(state.fetching).to.be.eql(initialState.fetching);
    expect(state.total).to.be.eql(initialState.total);
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

  it("modify state to unfetching when call reducer given a FETCH_ERROR", () => {
    // Act
    const state = photoGalleryReducer(initialState, { type: PhotoActionEnum.FetchError });

    // Assert
    expect(state).to.be.exist;
    expect(state.fetching).to.be.eql(false);
    expect(state.total).to.be.eql(initialState.total);
    expect(state.totalPages).to.be.eql(initialState.totalPages);
    expect(state.photos).to.be.eql(initialState.photos);
  });
});