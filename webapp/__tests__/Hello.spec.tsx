import * as React from "react";
import { expect } from "chai";
import { configure, shallow } from "enzyme";
import enzymeAdapterReact16 from "enzyme-adapter-react-16";
import { Hello } from "@webapp/components";

describe("[Unit Test][Component: Hello]", () => {
  before(() => {
    configure({ adapter: new enzymeAdapterReact16() });
  });

  it("show message when initialized Hello given a message", () => {
    const message: string = "Hello world";

    const wrapper = shallow(<Hello message={message} />);

    expect(wrapper.contains(<p>{message}</p>)).to.be.true;
  });
});