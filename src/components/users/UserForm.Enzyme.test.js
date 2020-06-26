import React from "react";
import UserForm from "./UserForm";
import { shallow, mount } from "enzyme";
import { users, addresses } from "../../../tools/mockData";

const renderCourseForm = (args) => {
  const defaultProps = {
    handleSubmit: () => {},
    handleFieldChange: () => {},
    user: {},
    validationErrors: {},
    addresses: [],
    isSaving: false,
    isLoading: false,
  };
  const props = { ...defaultProps, ...args };
  return shallow(<UserForm {...props} />);
};

it("changes the button text to 'Saving...' when saving is true", () => {
  const wrapper = renderCourseForm({ isSaving: true });
  console.log(wrapper.debug());
  expect(wrapper.find("button").text()).toEqual("Saving...");
  expect(wrapper.find("TextInput").length).toBe(2);
});
