"use client";

import { AppThunkDispatch } from "@/app/store";
import {
  fetchPosts,
  getPosts,
  getPostsError,
  getPostsStatus,
} from "@/features/postsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
    <div className="h-[500px] bg-white rounded-xl">{JSON.stringify(posts)}</div>
  );
}
