"use client";

import { getUser } from "@/features/userSlice";
import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

export default function page() {
  const user: User = useSelector(getUser);

  return (
    <div className="w-full grid grid-cols-[1fr_2fr] gap-2">
      <div className="h-[800px] border p-4 border-black flex flex-col items-center gap-3">
        <Image
          src={user.image || ""}
          alt="profile"
          width={200}
          height={200}
          className="rounded-full"
        />
      </div>
      <div className="h-[800px] border border-black">posts here</div>
    </div>
  );
}
