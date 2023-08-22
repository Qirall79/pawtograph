"use client";

import { AppThunkDispatch } from "@/app/store";
import {
  fetchPosts,
  getPosts,
  getPostsError,
  getPostsStatus,
} from "@/features/postsSlice";
import { Comment, Post as PostType, User } from "@prisma/client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";
import PostSkeleton from "../Post/PostSkeleton";
interface IComment extends Comment {
  author: User;
}

interface IPost extends PostType {
  author: User;
  Comments: IComment[];
}

export default function Feed() {
  const dispatch = useDispatch<AppThunkDispatch>();
  const status = useSelector(getPostsStatus);
  const posts = useSelector(getPosts);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === "failed") {
    return <div className="h-[500px] bg-white rounded-xl">{error}</div>;
  }

  if (status === "loading") {
    return (
      <div className="flex flex-col gap-6">
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post: IPost) => {
        return <Post post={post} />;
      })}
      <div className="w-full bg-slate-100 p-4 rounded-lg text-sm">
        There are no more posts available for you, please follow more pets !
      </div>
    </div>
  );
}
