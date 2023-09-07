"use client";

import Following from "@/components/Following/Following";
import FollowSkeleton from "@/components/Global/FollowSkeleton";
import { getUser, getUserError, getUserStatus } from "@/features/userSlice";
import { Spinner } from "@nextui-org/react";
import { User } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Page() {
  const user: User = useSelector(getUser);
  const status = useSelector(getUserStatus);
  const error = useSelector(getUserError);
  const [isLoading, setIsLoading] = useState(false);
  const [followings, setFollowings] = useState<
    { id: string; name: string; image: string }[]
  >([]);

  const fetchFollowing = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/users/following", { method: "get" });
      if (!res.ok) {
        throw new Error("Something went wrong, " + res.json());
      }
      const data = await res.json();
      setFollowings(data.followings);
    } catch (error: any) {
      toast.error("Something went wrong, please try again later !");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const unfollowUser = async (id: string) => {
    try {
      await fetch("/api/users/following", {
        method: "put",
        body: JSON.stringify({
          action: "unfollow",
          id,
        }),
      });
      const newFollowings = [...followings].filter((f) => f.id !== id);
      setFollowings([...newFollowings]);
    } catch (error: any) {
      toast.error("Something went wrong, please try again later !");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowing();
  }, []);

  if (status === "failed") {
    return <h1>{error}</h1>;
  }

  if (status === "loading" || !user?.id) {
    return (
      <main className="flex w-screen h-screen flex-col items-center justify-center absolute top-0 left-0">
        <Spinner size="lg" />
      </main>
    );
  }

  if (isLoading) {
    return (
      <div
        id="container"
        className="w-full flex flex-col justify-center max-w-[800px] bg-white rounded-xl gap-8 p-8 relative"
      >
        <h2 className="text-2xl font-semibold">Followings</h2>
        <FollowSkeleton />
        <FollowSkeleton />
        <FollowSkeleton />
        <FollowSkeleton />
        <FollowSkeleton />
      </div>
    );
  }

  if (!followings.length) {
    return (
      <div
        id="container"
        className="w-full flex flex-col justify-center max-w-[800px] bg-white rounded-xl gap-8 p-8 relative"
      >
        <h2 className="text-2xl font-semibold">Followings</h2>
        You're not following any pet yet !
      </div>
    );
  }

  return (
    <div
      id="container"
      className="w-full flex flex-col justify-center max-w-[800px] bg-white rounded-xl gap-8 p-8 relative"
    >
      <h2 className="text-2xl font-semibold">Followings</h2>
      {followings.map((follow) => {
        return <Following follow={follow} unfollowUser={unfollowUser} />;
      })}
    </div>
  );
}
