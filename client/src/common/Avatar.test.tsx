import React from "react";
import { render } from "@testing-library/react";
import { Avatar } from "./Avatar";

it("should show an avatar with the letters", () => {
  const user = { firstName: "Jamie", lastName: "Oliver" };
  const avatar = render(<Avatar user={user} />);
  expect(avatar.queryByText("JO")).toBeTruthy();
});

it("should show an avatar with image without letters", () => {
  const photoUrl = "https://i.ytimg.com/vi/crZ70qHR2A0/maxresdefault.jpg";

  const user = { firstName: "Jamie", lastName: "Oliver", photoUrl };

  const avatar = render(<Avatar user={user} />);

  expect(avatar.queryByText("JO")).toBeFalsy();
  expect(avatar.container).toHaveStyle(`background-image: url: ${photoUrl}`);
});
