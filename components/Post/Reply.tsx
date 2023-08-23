"use client";

import { getUser } from "@/features/userSlice";
import { User } from "@nextui-org/react";
import { Reply as ReplyType, User as UserType } from "@prisma/client";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { useSelector } from "react-redux";

interface IReply extends ReplyType {
  author: UserType;
}

export default function Reply({
  reply,
  replies,
  setReplies,
}: {
  reply: IReply;
  replies: IReply[];
  setReplies: any;
}) {
  const user = useSelector(getUser);

  const addLike = () => {
    const repliesCopy = [...replies];
    const index = repliesCopy.findIndex((r) => r.id === reply.id);
    repliesCopy[index].likes.push(user.id);
    setReplies([...repliesCopy]);
  };

  const removeLike = () => {
    const repliesCopy = [...replies];
    const index = repliesCopy.findIndex((r) => r.id === reply.id);
    const userIdIndex = repliesCopy[index].likes.findIndex(
      (l) => l === user.id
    );
    repliesCopy[index].likes.splice(userIdIndex, 1);

    setReplies([...repliesCopy]);
  };

  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex gap-4 items-center">
        <User
          as="button"
          avatarProps={{
            src: reply.author.image || "",
            size: "sm",
          }}
          className="transition-transform gap-2 font-semibold capitalize"
          name={reply.author.name}
        />
        <p>{reply.text}</p>
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 items-center cursor-pointer hover:text-pink-700 transition">
          {reply.likes.includes(user.id) ? (
            <AiFillHeart
              onClick={removeLike}
              className="text-md text-pink-700"
            />
          ) : (
            <AiOutlineHeart onClick={addLike} className="text-md" />
          )}
          {reply.likes.length > 0 && (
            <span
              className={
                reply.likes.includes(user.id) ? "text-sm text-pink-700" : ""
              }
            >
              {reply.likes.length}
            </span>
          )}
        </div>
        {reply.author.id === user.id && (
          <CiMenuKebab className="ml-2 cursor-pointer text-lg" />
        )}
      </div>
    </div>
  );
}