"use client";

import { getUser } from "@/features/userSlice";
import { Avatar, User, useDisclosure } from "@nextui-org/react";
import { Comment, Post, User as UserType } from "@prisma/client";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaCommentSlash, FaRegComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Comments from "./Comments";
import { deletePost, updatePost } from "@/features/postsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import PostDropdown from "./PostDropdown";
import DeleteModal from "./DeleteModal";

interface IComment extends Comment {
  author: UserType;
}

interface IPost extends Post {
  author: UserType;
  Comments: IComment[];
}

export default function Post({ post }: { post: IPost }) {
  const user: UserType = useSelector(getUser);
  const [commentsActivated, setCommentsActivated] = useState(false);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const updatePostData = async (newPost: any) => {
    try {
      const res = await axios.put("/api/posts/", newPost);
      toast.success(JSON.stringify(res.data.post));
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong, couldn't update post !");
    }
  };

  const removePost = async () => {
    try {
      await axios.delete("/api/posts/" + post.id);
      dispatch(deletePost(post.id));
      toast.success("Post deleted successfully !");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const addLike = async () => {
    const newPost = { ...post, likes: [...post.likes, user.id] };
    dispatch(updatePost(newPost));
    await updatePostData(newPost);
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
        <User
          as="button"
          avatarProps={{
            src: post.author.image || "",
            size: "lg",
          }}
          className="transition-transform gap-2 font-semibold capitalize"
          name={post.author.name}
          description="1 hour ago"
        />
        {post.authorId === user.id && <PostDropdown onOpen={onOpen} />}
        <DeleteModal
          action={removePost}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          message="Are you sure you want to delete this post ?"
        />
      </div>
      <h2>{post.text}</h2>
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
          {post.Comments.length > 0 && <span>{post.Comments.length}</span>}
        </div>
      </div>

      {commentsActivated && <Comments postId={post.id} />}
    </div>
  );
}
