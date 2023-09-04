"use client";
import { getPosts } from "@/features/postsSlice";
import { getUser } from "@/features/userSlice";
import { IComment } from "@/types";
import { Avatar, Button, Input } from "@nextui-org/react";
import { Post, User } from "@prisma/client";
import axios from "axios";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { MdDone } from "react-icons/md";
import { useSelector } from "react-redux";

export default function AddComment({
  postId,
  comments,
  setComments,
}: {
  postId: string;
  comments: IComment[];
  setComments: any;
}) {
  const user: User = useSelector(getUser);
  const posts: Post[] = useSelector(getPosts);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // react-hook-form's reset is not working, I had to write a custom control
  const [commentBody, setCommentBody] = useState("");

  const submitComment = async (data: FieldValues) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/comments/" + postId, {
        text: data.text,
        authorId: user.id,
      });
      setComments([...comments, res.data.comment]);
      setIsLoading(false);
      setCommentBody("");

      // send notification only if the user commented isn't the owner
      const post = posts.find((p) => p.id === postId);
      if (post?.authorId !== user.id) {
        await axios.post("/api/notifications", {
          message: `${user.name} commented on your post "${data.text?.substring(
            0,
            12
          )}..."`,
          link: "/posts/" + postId,
          userId: post!.authorId,
          type: "comment",
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex items-center gap-3 py-2 pl-2 rounded-md">
      <Avatar size="sm" src={user.image!} />
      <form className="flex flex-1 gap-3">
        <Input
          {...register("text", { required: true })}
          isDisabled={isLoading}
          validationState={errors?.text ? "invalid" : "valid"}
          name="text"
          placeholder="write a comment..."
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
        />
        <Button
          onClick={handleSubmit(submitComment)}
          isLoading={isLoading}
          isIconOnly
          variant="ghost"
          type="submit"
          startContent={<MdDone className="text-2xl" />}
        />
      </form>
    </div>
  );
}
