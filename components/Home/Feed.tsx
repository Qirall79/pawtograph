"use client";

import { AppThunkDispatch } from "@/app/store";
import {
  fetchPosts,
  getPosts,
  getPostsError,
  getPostsStatus,
} from "@/features/postsSlice";
import { Post as PostType } from "@prisma/client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";

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
    return <div className="h-[500px] bg-white rounded-xl">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post: PostType) => {
        return <Post post={post} />;
      })}
    </div>
  );
}
