"use client";

import { getUser } from "@/features/userSlice";
import { User, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import MenuDropdown from "./MenuDropdown";
import DeleteModal from "./DeleteModal";
import { IReply } from "@/types";

export default function Reply({
  reply,
  replies,
  setReplies,
  deleteReplyFromComment,
}: {
  reply: IReply;
  replies: IReply[];
  deleteReplyFromComment: any;
  setReplies: any;
}) {
  const user = useSelector(getUser);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const updateReply = async () => {
    try {
      await axios.put("/api/replies", {
        id: reply.id,
        likes: reply.likes,
      });
    } catch (error) {
      toast.error("Something went wrong !");
      console.log(error);
    }
  };

  const removeReply = async () => {
    try {
      await axios.delete("/api/replies/" + reply.id);

      // Update replies
      const index = replies.findIndex((r) => r.id === reply.id);
      const newReplies = [...replies];
      newReplies.splice(index, 1);
      deleteReplyFromComment(reply.id);
      setReplies([...newReplies]);
    } catch (error) {
      toast.error("Something went wrong, couldn't delete reply !");
      console.log(error);
    }
  };

  const addLike = async () => {
    const repliesCopy = [...replies];
    const index = repliesCopy.findIndex((r) => r.id === reply.id);
    repliesCopy[index].likes.push(user.id);
    setReplies([...repliesCopy]);
    await updateReply();
  };

  const removeLike = async () => {
    const repliesCopy = [...replies];
    const index = repliesCopy.findIndex((r) => r.id === reply.id);
    const userIdIndex = repliesCopy[index].likes.findIndex(
      (l) => l === user.id
    );
    repliesCopy[index].likes.splice(userIdIndex, 1);

    setReplies([...repliesCopy]);
    await updateReply();
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
          <MenuDropdown isNotReply={false} onOpen={onOpen} />
        )}
        <DeleteModal
          action={removeReply}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          message="Are you sure you want to delete this reply ?"
        />
      </div>
    </div>
  );
}
