import { getUser, getUserStatus } from "@/features/userSlice";
import { IUser } from "@/types";
import { Chip } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

export default function UserInfo() {
  const user: IUser = useSelector(getUser);
  const randomNumber = Math.floor(Math.random() * 4 + 1);

  if (!user?.id) {
    return (
      <div className="h-[800px] border p-4 border-black flex flex-col items-center gap-3">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-[800px] p-4 flex flex-col items-center gap-3 relative">
      <div className="w-full flex items-end justify-center mb-[60px]">
        <Image
          src={"/images/cover-" + randomNumber + ".png"}
          width={300}
          height={300}
          className="w-full absolute top-0 left-0 rounded-t-xl"
          alt="cover"
        />
        <Image
          src={user.image || ""}
          alt="profile"
          width={120}
          height={120}
          className="rounded-full relative z-10 translate-y-[68px]"
        />
      </div>
      <div className="flex gap-2">
        <div className="px-4  bg-slate-400 rounded-full flex flex-col items-center">
          <span className="text-sm font-semibold">
            {user.followedBy?.length}
          </span>
          <span className="text-xs">Followers</span>
        </div>
        <div className="px-4 bg-slate-400 rounded-full flex flex-col items-center">
          <span className="text-sm font-semibold">{user.follows?.length}</span>
          <span className="text-xs">Follows</span>
        </div>
      </div>
    </div>
  );
}
