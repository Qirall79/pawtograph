import { getUser, getUserStatus } from "@/features/userSlice";
import { IUser } from "@/types";
import { Button, Chip } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";
import UserInfoSkeleton from "./UserInfoSkeleton";

export default function UserInfo({ userId }: { userId: string }) {
  const [user, setUser] = useState<IUser>();
  const [conversation, setConversation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const currentUser: IUser = useSelector(getUser);
  const randomNumber = Math.floor(Math.random() * 4 + 1);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/users/" + userId);

      // get the link to the conversation between the two users
      const convResponse = await axios.get("/api/conversations/" + userId);
      setConversation(convResponse.data.conversation);
      setIsLoading(false);
      setUser(res.data.user);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const followUser = async () => {
    try {
      const newUserFollowers = [...user!.followedBy!, { ...currentUser }];
      setUser({ ...user, followedBy: [...newUserFollowers] } as IUser);
      await axios.put("/api/users/following", {
        action: "follow",
        id: user?.id,
      });

      // send follow notification
      await axios.post("/api/notifications", {
        message: `${currentUser.name} started following you`,
        link: "/profile/" + currentUser.id,
        userId: user!.id,
        type: "follow",
      });
    } catch (error) {
      toast.error(
        "Something went wrong, can't follow user. Please try again later !"
      );
      console.log(error);
    }
  };

  const unfollowUser = async () => {
    try {
      const newUserFollowers = [...user!.followedBy!].filter(
        (u) => u.id !== currentUser.id
      );
      setUser({ ...user, followedBy: [...newUserFollowers] } as IUser);
      await axios.put("/api/users/following", {
        action: "unfollow",
        id: user?.id,
      });
    } catch (error) {
      toast.error(
        "Something went wrong, can't unfollow user. Please try again later !"
      );
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userId || userId === currentUser.id) {
      setUser({ ...currentUser });
      return;
    }
    fetchUser();
  }, []);

  if (isLoading || !user?.id) {
    return (
      <div className="h-[500px] bg-white p-8 rounded-xl flex flex-col items-center gap-3">
        <UserInfoSkeleton />
      </div>
    );
  }

  return (
    <div className=" pb-6 rounded-xl bg-white flex flex-col items-center gap-3">
      <div className="w-full flex flex-col items-center">
        <Image
          src={"/images/cover-" + randomNumber + ".png"}
          width={300}
          height={300}
          className="w-full rounded-t-xl"
          alt="cover"
        />
        <Image
          src={user.image || ""}
          alt="profile"
          width={120}
          height={120}
          className="rounded-full relative z-10 -translate-y-1/2"
        />
        <p className="capitalize text-xl -translate-y-4">{user.name}</p>
      </div>
      <div className="flex gap-8 items-center -translate-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">
            {user.followedBy?.length}
          </span>
          {user.id === currentUser.id ? (
            <Link className="text-xs" href={"/followers"}>
              Followers
            </Link>
          ) : (
            <span className="text-xs">Followers</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{user.follows?.length}</span>
          {user.id === currentUser.id ? (
            <Link className="text-xs" href={"/following"}>
              Follows
            </Link>
          ) : (
            <span className="text-xs">Follows</span>
          )}
        </div>
      </div>

      {user.id === currentUser.id ? (
        <Link href={"/settings"}>
          <Button
            color="secondary"
            size="sm"
            startContent={<FiSettings className="text-lg" />}
          >
            Settings
          </Button>
        </Link>
      ) : user.followedBy?.some((u) => u.id === currentUser.id) ? (
        <Button
          onClick={async () => {
            await unfollowUser();
          }}
          variant="solid"
          color="primary"
          className="font-bold group hover:!bg-rose-600 transition"
          endContent={
            <>
              <RiUserFollowFill className="text-lg group-hover:hidden" />
              <RiUserUnfollowFill className="text-lg hidden group-hover:flex" />
            </>
          }
        >
          <>
            <span className="group-hover:hidden">Following</span>
            <span className="hidden group-hover:flex">Unfollow</span>
          </>
        </Button>
      ) : (
        <Button
          onClick={async () => {
            await followUser();
          }}
          variant="ghost"
          color="primary"
          className="font-bold"
          endContent={<AiOutlineUserAdd className="text-lg" />}
        >
          Follow
        </Button>
      )}
      {userId !== currentUser.id && (
        <Button size="sm">
          <Link href={`/conversations/${conversation}`}>Message</Link>
        </Button>
      )}
    </div>
  );
}
