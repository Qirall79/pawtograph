"use client";

import Posts from "@/components/Profile/Posts";
import UserInfo from "@/components/Profile/UserInfo";
import { getUser, getUserError, getUserStatus } from "@/features/userSlice";
import { Spinner } from "@nextui-org/react";
import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

export default function page() {
  const user: User = useSelector(getUser);
  const status = useSelector(getUserStatus);
  const error = useSelector(getUserError);

  if (status === "failed") {
    return <h1>{error}</h1>;
  }

  if (status === "loading" || !user?.id) {
    return (
      <main className="flex w-screen h-screen flex-col items-center justify-center absolute top-0 left-0 overflow-y-hidden">
        <Spinner size="lg" />
      </main>
    );
  }

  return (
    <div className="w-full grid grid-cols-[1fr_2fr] gap-2">
      <UserInfo />
      <Posts userId={user.id} />
    </div>
  );
}
