"use client";

import { deleteNotification, getUser } from "@/features/userSlice";
import { Button, Input, User, useDisclosure } from "@nextui-org/react";
import { Post, User as UserType } from "@prisma/client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Comments from "./Comments";
import { deletePost, updatePost } from "@/features/postsSlice";
import { toast } from "react-hot-toast";
import MenuDropdown from "./MenuDropdown";
import DeleteModal from "./DeleteModal";
import { FieldValues, useForm } from "react-hook-form";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import { AiFillEdit, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaCommentSlash, FaRegComment } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import { IPost } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteFile } from "@/lib/uploadFile";

TimeAgo.addDefaultLocale(en);

export default function Post({
  post,
  isSingle,
}: {
  post: IPost;
  isSingle?: boolean;
}) {
  const user: UserType = useSelector(getUser);
  const [commentsActivated, setCommentsActivated] = useState(false);
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [commentsCount, setCommentsCount] = useState(post.Comments!.length);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const timeAgo = new TimeAgo("en-US");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updatePostData = async (newPost: any) => {
    try {
      await fetch("/api/posts/", {
        method: "put",
        body: JSON.stringify(newPost),
      });
    } catch (error) {
      toast.error("Something went wrong, couldn't update post !");
    }
  };

  const handleUpdate = async (data: FieldValues) => {
    // check if nothing changed
    if (data.text === post.text) {
      setEditing(false);
      return;
    }

    try {
      setIsLoading(true);
      const newPost = { ...post, text: data.text };
      await updatePostData(newPost);
      dispatch(updatePost(newPost));
      setIsLoading(false);
      setEditing(false);
    } catch (error) {
      setIsLoading(false);
      setEditing(false);
      toast.error("Something went wrong, couldn't update post !");
    }
  };

  const removePost = async () => {
    try {
      await fetch("/api/posts/" + post.id, {
        method: "delete",
      });
      if (post.photo) {
        await deleteFile(
          post.photo.split("/")[post.photo.split("/").length - 1]
        );
      }
      dispatch(deletePost(post.id));
      dispatch(deleteNotification(post.id));
      toast.success("Post deleted successfully !");
      if (isSingle) {
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const addLike = async () => {
    const newPost = { ...post, likes: [...post.likes, user.id] };
    dispatch(updatePost(newPost));
    await updatePostData(newPost);
    await fetch("/api/notifications", {
      method: "post",
      body: JSON.stringify({
        message: `${
          newPost.likes.length
        } pets liked your post "${post.text?.substring(0, 12)}..."`,
        link: "/posts/" + post.id,
        userId: post.authorId,
        type: "like",
      }),
    });
  };

  const removeLike = async () => {
    const likesCopy = [...post.likes];
    const index = likesCopy.indexOf(user.id);
    likesCopy.splice(index, 1);
    const newPost = { ...post, likes: likesCopy };
    dispatch(updatePost(newPost));
    await updatePostData(newPost);
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-white rounded-lg p-6">
      <div className="flex justify-between items-center">
        <Link href={`/profile/${post.authorId}`}>
          <User
            as="button"
            avatarProps={{
              src: post.author?.image || "",
              size: "lg",
            }}
            className="transition-transform gap-2 font-semibold capitalize"
            name={post.author?.name}
            description={`${timeAgo.format(
              new Date(post.createdAt),
              "mini-now"
            )}`}
          />
        </Link>
        {post.authorId === user.id && (
          <MenuDropdown isNotReply onOpen={onOpen} setEditing={setEditing} />
        )}
        <DeleteModal
          action={removePost}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          message="Are you sure you want to delete this post ?"
        />
      </div>
      {editing ? (
        <div className="flex gap-2">
          <Input
            {...register("text", { required: "Post description is required" })}
            type="text"
            defaultValue={post.text || ""}
            validationState={errors?.text ? "invalid" : "valid"}
            errorMessage={String(
              errors?.text?.message ? errors?.text?.message : ""
            )}
            isDisabled={isLoading}
          />
          <Button
            onClick={handleSubmit(handleUpdate)}
            type="submit"
            isIconOnly
            variant="ghost"
            color="default"
            startContent={<AiFillEdit className="text-xl" />}
            size="md"
            isLoading={isLoading}
          />
          <Button
            onClick={() => setEditing(false)}
            isIconOnly
            color="danger"
            startContent={<TiCancel className="text-xl" />}
            size="md"
            isDisabled={isLoading}
          />
        </div>
      ) : (
        <h2>{post.text}</h2>
      )}
      {post.photo && (
        <Image
          src={post.photo}
          width={300}
          height={300}
          alt="post"
          className="w-full rounded-lg"
        />
      )}

      <div className="flex items-center gap-8">
        <div className="flex gap-2 items-center cursor-pointer hover:text-pink-700 transition">
          {post.likes.includes(user.id) ? (
            <AiFillHeart
              onClick={removeLike}
              className="text-[28px] text-pink-700"
            />
          ) : (
            <AiOutlineHeart onClick={addLike} className="text-[28px]" />
          )}
          {post.likes.length > 0 && (
            <span
              className={post.likes.includes(user.id) ? "text-pink-700" : ""}
            >
              {post.likes.length}
            </span>
          )}
        </div>
        <div
          onClick={() => setCommentsActivated(!commentsActivated)}
          className="flex gap-2 items-center cursor-pointer hover:text-blue-800 transition"
        >
          {commentsActivated ? (
            <FaCommentSlash className="text-3xl " />
          ) : (
            <FaRegComment className="text-2xl " />
          )}
          {commentsCount! > 0 && <span>{commentsCount}</span>}
        </div>
      </div>

      {commentsActivated && (
        <Comments postId={post.id} setCommentsCount={setCommentsCount} />
      )}
    </div>
  );
}
