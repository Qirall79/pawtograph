"use client";

import { AppThunkDispatch } from "@/app/store";
import PostSkeleton from "@/components/Post/PostSkeleton";
import {
  fetchPost,
  getPosts,
  getPostsError,
  getPostsStatus,
} from "@/features/postsSlice";
import { IPost } from "@/types";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "@/components/Post/Post";
import { getUser, getUserStatus } from "@/features/userSlice";
import { Spinner } from "@nextui-org/react";

export default function Page() {
  const status = useSelector(getPostsStatus);
  const posts: IPost[] = useSelector(getPosts);
  const error = useSelector(getPostsError);
  const user = useSelector(getUser);
  const userStatus = useSelector(getUserStatus);
  const dispatch = useDispatch<AppThunkDispatch>();
  const { postId } = useParams();

  useEffect(() => {
    dispatch(fetchPost(postId as string));
  }, [dispatch]);

  if (status === "failure") {
    return <p className="text-red-600">{error}</p>;
  }

  if (userStatus === "failure") {
    return <p className="text-red-600">User could not be fetched</p>;
  }

  if (userStatus === "loading" || !user?.id) {
    return (
      <main className="flex w-screen h-screen flex-col items-center justify-center absolute top-0 left-0">
        <Spinner size="lg" />
      </main>
    );
  }

  if (status === "loading") {
    return (
      <div className="w-full max-w-[500px] flex flex-col gap-6">
        <PostSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[500px] flex flex-col gap-6">
      {posts.map((post: IPost) => {
        return <Post post={post} />;
      })}
    </div>
  );
}
