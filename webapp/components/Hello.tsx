import * as React from "react";

interface Props {
  message: string;
}

export class Hello extends React.Component<Props> {
  render() {
    const { message } = this.props;
    return (
      <div>
        <p>{message}</p>
      </div>
    );
  }
}