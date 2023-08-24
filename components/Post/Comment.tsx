import { getUser } from "@/features/userSlice";
import { User, useDisclosure } from "@nextui-org/react";
import { Comment, Reply, User as UserType } from "@prisma/client";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaCommentSlash, FaRegComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import Replies from "./Replies";
import { CiMenuKebab } from "react-icons/ci";
import { toast } from "react-hot-toast";
import axios from "axios";
import MenuDropdown from "./MenuDropdown";
import DeleteModal from "./DeleteModal";

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
  const [repliesCount, setRepliesCount] = useState(comment.Replies.length);
  const user = useSelector(getUser);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteReplyFromComment = (replyId: string) => {
    const updatedComment = { ...comment };
    const replyIndex = comment.Replies.findIndex((r) => r.id === replyId);
    updatedComment.Replies.splice(replyIndex, 1);
    const commentIndex = comments.findIndex((c) => c.id === comment.id);
    const newComments = [...comments];
    newComments.splice(commentIndex, 1);
    newComments.push(updatedComment);
    setComments([...newComments]);
  };

  const updateComment = async () => {
    try {
      await axios.put("/api/comments/" + comment.postId, comment);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeComment = async () => {
    try {
      await axios.delete("/api/comments/" + comment.postId + "/" + comment.id);
      const index = comments.findIndex((c) => c.id === comment.id);
      const newComments = [...comments];
      newComments.splice(index, 1);
      setComments(newComments);
    } catch (error) {
      toast.error("Something went wrong, couldn't delete comment !");
      console.log(error);
    }
  };

  const addLike = async () => {
    const commentsCopy = [...comments];
    const index = commentsCopy.findIndex((c) => c.id === comment.id);
    commentsCopy[index].likes.push(user.id);
    setComments([...commentsCopy]);
    await updateComment();
  };

  const removeLike = async () => {
    const commentsCopy = [...comments];
    const index = commentsCopy.findIndex((c) => c.id === comment.id);
    const userIdIndex = commentsCopy[index].likes.findIndex(
      (id) => id === user.id
    );
    commentsCopy[index].likes.splice(userIdIndex, 1);
    setComments([...commentsCopy]);
    await updateComment();
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
        {comment.author.id === user.id && (
          <MenuDropdown isNotReply onOpen={onOpen} />
        )}
        <DeleteModal
          action={removeComment}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          message="Are you sure you want to delete this comment ?"
        />
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
          {repliesCount > 0 && <span className="text-sm">{repliesCount}</span>}
        </div>
      </div>
      {repliesActivated && (
        <Replies
          comment={comment}
          comments={comments}
          setComments={setComments}
          setRepliesCount={setRepliesCount}
          deleteReplyFromComment={deleteReplyFromComment}
        />
      )}
    </div>
  );
}
