import { createStore, applyMiddleware, Store, Reducer } from "redux";
import reduxThunk from "redux-thunk";
import { ReducerService } from "@webapp/reducers";
import { AppState } from "@webapp/types";

export class StoreService {
  private readonly appStore: Store<AppState>;
  private static storeService: StoreService;

  get store(): Store<AppState> {
    return this.appStore;
  }

  constructor(reducers: Reducer<AppState>) {
    this.appStore = createStore(reducers, applyMiddleware(reduxThunk));
  }

  static getSingletonInstance(): StoreService {
    if (!this.storeService) {
      const reducerService = ReducerService.getSingletonInstance();
      this.storeService = new StoreService(reducerService.appReducer);
    }

    return this.storeService;
  }
}