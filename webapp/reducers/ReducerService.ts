import { combineReducers, Reducer } from "redux";
import { AppState } from "@webapp/types";
import { photoGalleryReducer } from "@webapp/reducers";

export class ReducerService {
  private readonly reducer: Reducer<AppState>;
  private static reducerService: ReducerService;

  get appReducer() {
    return this.reducer;
  }

  constructor() {
    this.reducer = combineReducers<AppState>({
      photoGallery: photoGalleryReducer,
    });
  }

  static getSingletonInstance(): ReducerService {
    return this.reducerService;
  }
}