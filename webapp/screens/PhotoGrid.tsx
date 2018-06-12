import * as React from "react";
import { connect } from "react-redux";
import { AppState, PhotoGalleryState } from "@webapp/types";
import { IPhotoGalleryReduxService, PhotoGalleryReduxService } from "@webapp/services";
import { IPagination } from "@photos";

interface Props {
  photoService: IPhotoGalleryReduxService;
  photoGallery: PhotoGalleryState;
}
interface State {
  filter: IPagination;
}

const defaultItemsPerPage = 20;

export class PhotoGrid extends React.Component<Props, State> {

  private get photoService() {
    return this.props.photoService;
  }

  constructor(props: Props) {
    super(props);
    const { photoGallery } = props;
    this.state = {
      filter: {
        page: photoGallery.page,
        itemsPerPage: defaultItemsPerPage,
      },
    };
  }

  componentWillMount() {
    const { filter } = this.state;
    this.photoService.loadPhotos(filter);
  }

  render() {
    const { photoGallery } = this.props;
    return (
      <div>
        <p>{JSON.stringify(photoGallery)}</p>
      </div>
    );
  }
}

export default connect(({ photoGallery }: AppState) => ({
  photoGallery,
}))(PhotoGrid);