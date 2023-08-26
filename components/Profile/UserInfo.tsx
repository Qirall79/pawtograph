import { getUser, getUserStatus } from "@/features/userSlice";
import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

export default function UserInfo() {
  const user: User = useSelector(getUser);

  if (!user?.id) {
    return (
      <div className="h-[800px] border p-4 border-black flex flex-col items-center gap-3">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-[800px] border p-4 border-black flex flex-col items-center gap-3">
      <Image
        src={user.image || ""}
        alt="profile"
        width={200}
        height={200}
        className="rounded-full"
      />
    </div>
  );
}
