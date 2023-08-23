import { getUser } from "@/features/userSlice";
import { User } from "@nextui-org/react";
import { Comment, Reply, User as UserType } from "@prisma/client";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaCommentSlash, FaRegComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import Replies from "./Replies";

interface IReply extends Reply {
  author: UserType;
}

interface IComment extends Comment {
  author: UserType;
  Replies: IReply[];
}

export default function Comment({
  comment,
  comments,
  setComments,
}: {
  comment: IComment;
  comments: IComment[];
  setComments: any;
}) {
  const [repliesActivated, setRepliesActivated] = useState(false);
  const user = useSelector(getUser);

  const addLike = () => {
    const commentsCopy = [...comments];
    const index = commentsCopy.findIndex((c) => c.id === comment.id);
    commentsCopy[index].likes.push(user.id);
    setComments([...commentsCopy]);
  };

  const removeLike = () => {
    const commentsCopy = [...comments];
    const index = commentsCopy.findIndex((c) => c.id === comment.id);
    const userIdIndex = commentsCopy[index].likes.findIndex(
      (id) => id === user.id
    );
    commentsCopy[index].likes.splice(userIdIndex, 1);
    setComments([...commentsCopy]);
  };

  return (
    <div className="w-full flex flex-col  gap-2 bg-slate-100 p-2 rounded-md">
      <div className="flex w-full justify-between items-center">
        <div className="flex gap-4 items-center">
          <User
            as="button"
            avatarProps={{
              src: comment.author.image || "",
              size: "sm",
            }}
            className="transition-transform gap-2 font-semibold capitalize"
            name={comment.author.name}
          />
          <p>{comment.text}</p>
        </div>
        <span>menu</span>
      </div>
      <div className="flex items-center gap-4 pl-10">
        <div className="flex gap-2 items-center cursor-pointer hover:text-pink-700 transition">
          {comment.likes.includes(user.id) ? (
            <AiFillHeart
              onClick={removeLike}
              className="text-md text-pink-700"
            />
          ) : (
            <AiOutlineHeart onClick={addLike} className="text-md" />
          )}
          {comment.likes.length > 0 && (
            <span
              className={
                comment.likes.includes(user.id) ? "text-sm text-pink-700" : ""
              }
            >
              {comment.likes.length}
            </span>
          )}
        </div>
        <div
          onClick={() => setRepliesActivated(!repliesActivated)}
          className="flex gap-2 items-center cursor-pointer hover:text-blue-800 transition"
        >
          {repliesActivated ? (
            <FaCommentSlash className="text-lg " />
          ) : (
            <FaRegComment className="text-md " />
          )}
          {comment.Replies.length > 0 && (
            <span className="text-sm">{comment.Replies.length}</span>
          )}
        </div>
      </div>
      {repliesActivated && <Replies comment={comment} />}
    </div>
  );
}
