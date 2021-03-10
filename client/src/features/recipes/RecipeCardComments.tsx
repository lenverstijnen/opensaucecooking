import { CommentList } from "../../common/comments/CommentList";
import { IComment } from "../../common/comments/IComment";
import React from "react";

export const RecipeCardComments = () => {
  const mockComments: IComment[] = [
    { _id: "comment1", text: "This is a comment." },
    { _id: "comment2", text: "This is another comment." },
  ];

  return <CommentList comments={mockComments}></CommentList>;
};
