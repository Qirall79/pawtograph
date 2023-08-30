"use client";

import Follower from "@/components/Followers/Follower";
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
  const [followers, setFollowers] = useState<
    { id: string; name: string; image: string }[]
  >([]);

  const fetchFollowing = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/users/followers");
      setFollowers(res.data.followers);
    } catch (error: any) {
      toast.error("Something went wrong, please try again later !");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFollower = async (id: string) => {
    try {
      await axios.put("/api/users/followers", {
        action: "unfollow",
        id,
      });
      const newFollowers = [...followers].filter((f) => f.id !== id);
      setFollowers([...newFollowers]);
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
        <h2 className="text-2xl font-semibold">Followers</h2>
        <FollowSkeleton />
        <FollowSkeleton />
        <FollowSkeleton />
        <FollowSkeleton />
        <FollowSkeleton />
      </div>
    );
  }

  if (!followers.length) {
    return (
      <div
        id="container"
        className="w-full flex flex-col justify-center max-w-[800px] bg-white rounded-xl gap-8 p-8 relative"
      >
        <h2 className="text-2xl font-semibold">Followers</h2>
        You're not following any pet yet !
      </div>
    );
  }

  return (
    <div
      id="container"
      className="w-full flex flex-col justify-center max-w-[800px] bg-white rounded-xl gap-8 p-8 relative"
    >
      <h2 className="text-2xl font-semibold">Followers</h2>
      {followers.map((follower) => {
        return <Follower follower={follower} deleteFollower={deleteFollower} />;
      })}
    </div>
  );
}
