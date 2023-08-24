"use client";
import { getUser } from "@/features/userSlice";
import { Avatar, Button, Input } from "@nextui-org/react";
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
  comments: any;
  setComments: any;
}) {
  const user = useSelector(getUser);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitComment = async (data: FieldValues) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/comments/" + postId, {
        text: data.text,
        authorId: user.id,
      });
      setComments([...comments, res.data.comment]);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex items-center gap-3 py-2 pl-2 rounded-md">
      <Avatar size="sm" src={user.image} />
      <form className="flex flex-1 gap-3">
        <Input
          {...register("text", { required: true })}
          isDisabled={isLoading}
          validationState={errors?.text ? "invalid" : "valid"}
          name="text"
          placeholder="write a comment..."
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
