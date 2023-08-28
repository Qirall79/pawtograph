import { AppThunkDispatch } from "@/app/store";
import {
  fetchPosts,
  getPosts,
  getPostsError,
  getPostsStatus,
  resetStatus,
} from "@/features/postsSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostSkeleton from "../Post/PostSkeleton";
import { IPost } from "@/types";
import Post from "@/components/Post/Post";

export default function Posts({ userId }: { userId: string }) {
  const status = useSelector(getPostsStatus);
  const posts: IPost[] = useSelector(getPosts);
  const error = useSelector(getPostsError);
  const dispatch = useDispatch<AppThunkDispatch>();

  useEffect(() => {
    dispatch(fetchPosts(userId));
  }, [dispatch]);

  if (status === "failure") {
    return <p className="text-red-600">{error}</p>;
  }

  if (status === "loading") {
    return (
      <div className="flex flex-col gap-6">
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full h-fit bg-slate-100 p-4 rounded-lg text-sm">
        This pet has no posts yet !
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post: IPost) => {
        return <Post post={post} />;
      })}
    </div>
  );
}
