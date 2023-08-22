import { Comment as CommentType, User } from "@prisma/client";
import Comment from "./Comment";
interface IComment extends CommentType {
  author: User;
}

export default function Comments({ comments }: { comments: IComment[] }) {
  return (
    <div>
      {comments.map((comment) => {
        return <Comment comment={comment} />;
      })}
    </div>
  );
}
