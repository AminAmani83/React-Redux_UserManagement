import React from "react";
import UserForm from "./UserForm";
import renderer from "react-test-renderer";
import { users, addresses } from "../../../tools/mockData";

it("changes the submit button label to 'Saving...' when saving is true", () => {
  const tree = renderer.create(
    <UserForm
      handleSubmit={jest.fn()}
      handleFieldChange={jest.fn()}
      user={users[0]}
      validationErrors={{}}
      addresses={addresses}
      isSaving={true}
      isLoading={false}
    />
  );
  expect(tree).toMatchSnapshot();
});

it("changes the submit button label to 'Save' when saving is false", () => {
  const tree = renderer.create(
    <UserForm
      handleSubmit={jest.fn()}
      handleFieldChange={jest.fn()}
      user={users[0]}
      validationErrors={{}}
      addresses={addresses}
      isSaving={false}
      isLoading={false}
    />
  );
  expect(tree).toMatchSnapshot();
});
