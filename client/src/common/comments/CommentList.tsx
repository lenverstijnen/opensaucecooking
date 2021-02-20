import { IComment } from "./IComment";
import { Comment } from "./Comment";

export const CommentList = ({ comments }: { comments: IComment[] }) => {
  const commentItems = comments.map((comment) => <Comment comment={comment} />);
  return <>{commentItems}</>;
};
