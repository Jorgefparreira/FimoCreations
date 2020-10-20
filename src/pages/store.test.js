import React from "react";
import { shallow } from "enzyme";
import Store from "./store";
describe("Store", () => {
  it("items list should not be empty ", () => {
    const wrapper = shallow(<Store />);
    const actual = wrapper.state("items").length;
    expect(actual).toBeGreaterThan(2);
  });

  // it("should change state type", () => {
  //   const wrapper = shallow(<Store />);
  //   const instance = wrapper.instance();
  //   expect(wrapper.state("type")).toBe("keyring");
  //   instance.changeCategory("necklace");
  //   expect(wrapper.state("type")).toBe("necklace");
  // });

  // it("should change state type from keyring to necklace on click", () => {
  //   const wrapper = shallow(<Store />);
  //   wrapper.find("#category-necklace").simulate("click");
  //   expect(wrapper.state("type")).toBe("necklace");
  // });

  // it("calls componentDidMount", () => {
  //   jest.spyOn(Store.prototype, "componentDidMount");
  //   const wrapper = shallow(<Store />);
  //   expect(Store.prototype.componentDidMount.mock.calls.length).toBe(1);
  // });
});
