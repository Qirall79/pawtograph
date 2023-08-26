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

export default function Posts({ userId }: { userId: string }) {
  const status = useSelector(getPostsStatus);
  const posts = useSelector(getPosts);
  const error = useSelector(getPostsError);
  const dispatch = useDispatch<AppThunkDispatch>();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts(userId));
    }

    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch]);

  if (status === "failure") {
    return <p className="text-red-600">{error}</p>;
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <div>{JSON.stringify(posts)}</div>;
}
