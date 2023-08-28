import { getUser, getUserStatus } from "@/features/userSlice";
import { IUser } from "@/types";
import { Button, Chip } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";
import { useSelector } from "react-redux";

export default function UserInfo() {
  const user: IUser = useSelector(getUser);
  const currentUser: IUser = useSelector(getUser);
  const randomNumber = Math.floor(Math.random() * 4 + 1);

  if (!user?.id) {
    return (
      <div className="h-[800px] border p-4 border-black flex flex-col items-center gap-3">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-[800px] flex flex-col items-center gap-3">
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
          <span className="text-xs">Followers</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{user.follows?.length}</span>
          <span className="text-xs">Follows</span>
        </div>
      </div>

      {user.followedBy?.some((u) => u.id === currentUser.id) ? (
        <Button
          variant="solid"
          color="secondary"
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
          variant="ghost"
          color="primary"
          className="font-bold"
          endContent={<AiOutlineUserAdd className="text-lg" />}
        >
          Follow
        </Button>
      )}
    </div>
  );
}
