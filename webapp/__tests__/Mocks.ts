import { stub } from "sinon";

export const storeMock = {
  dispatch: stub(),
  getState: stub(),
  replaceReducer: stub(),
  subscribe: stub(),
};