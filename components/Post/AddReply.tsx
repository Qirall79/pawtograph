"use client";
import { getUser } from "@/features/userSlice";
import { Avatar, Button, Input } from "@nextui-org/react";
import { Comment, Reply, User } from "@prisma/client";
import axios from "axios";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { MdDone } from "react-icons/md";
import { useSelector } from "react-redux";

interface IReply extends Reply {
  author: User;
}

interface IComment extends Comment {
  Replies: IReply[];
  author: User;
}

export default function AddReply({
  comment,
  replies,
  setReplies,
}: {
  comment: IComment;
  replies: IReply[];
  setReplies: any;
}) {
  const user = useSelector(getUser);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      text: "",
    },
  });

  const submitReply = async (data: FieldValues) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/replies/", {
        text: data.text,
        authorId: user.id,
        commentId: comment.id,
      });
      setReplies([...replies, res.data.reply]);
      setIsLoading(false);
      reset();
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex items-center gap-3 py-2 rounded-md">
      <Avatar size="sm" src={user.image} />
      <form className="flex flex-1 items-center gap-3">
        <Input
          {...register("text", { required: true })}
          isDisabled={isLoading}
          validationState={errors?.text ? "invalid" : "valid"}
          name="text"
          placeholder={"Reply to " + comment.author.name?.split(" ")[0] + "..."}
        />
        <Button
          onClick={handleSubmit(submitReply)}
          isLoading={isLoading}
          isIconOnly
          variant="ghost"
          size="sm"
          startContent={<MdDone className="text-xl" />}
        />
      </form>
    </div>
  );
}