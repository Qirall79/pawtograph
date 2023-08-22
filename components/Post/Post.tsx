"use client";

import { getUser } from "@/features/userSlice";
import { Avatar, User } from "@nextui-org/react";
import { Comment, Post, User as UserType } from "@prisma/client";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaComment, FaCommentSlash, FaRegComment } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useState } from "react";
import Comments from "./Comments";

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
        {post.authorId === user.id && (
          <CiMenuKebab className="text-4xl cursor-pointer rounded-full hover:bg-slate-100 p-1 transition" />
        )}
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
            <AiFillHeart className="text-[28px]" />
          ) : (
            <AiOutlineHeart className="text-[28px]" />
          )}
          {post.likes.length > 0 && <span>{post.likes.length}</span>}
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

      {commentsActivated && <Comments comments={post.Comments} />}
    </div>
  );
}
