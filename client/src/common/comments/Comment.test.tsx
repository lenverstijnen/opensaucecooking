import React from "react";
import { render } from "@testing-library/react";
import { Comment } from "./Comment";
import { IComment } from "./IComment";

it("should show a comment with an avatar and text", () => {
  const comment: IComment = {
    _id: "commentID",
    text: "This is the text",
    user: {
      firstName: "Jamie",
      lastName: "Oliver",
    },
  };
  const component = render(<Comment comment={comment}></Comment>);
  expect(component.queryByText("This is the text")).toBeTruthy();
  expect(component.queryByTestId("avatar")).toBeTruthy();
  expect(component.queryByText("JO")).toBeTruthy();
});
