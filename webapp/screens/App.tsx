import * as React from "react";
import { Provider } from "react-redux";
import { StoreService, PhotoGalleryReduxService } from "@webapp/services";
import PhotoGrid from "@webapp/screens/PhotoGrid";

interface Props {
}

export class App extends React.Component<Props> {

  private readonly storeService: StoreService;

  constructor(props: Props) {
    super(props);
    this.storeService = StoreService.getSingletonInstance();
  }

  render() {
    return (
      <Provider store={this.storeService.store}>
        <PhotoGrid
          photoService={PhotoGalleryReduxService.getSingletonInstance()} />
      </Provider>
    );
  }
}