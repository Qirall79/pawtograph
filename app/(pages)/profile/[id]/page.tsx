"use client";

import Posts from "@/components/Profile/Posts";
import UserInfo from "@/components/Profile/UserInfo";
import { getUser, getUserError, getUserStatus } from "@/features/userSlice";
import { Spinner } from "@nextui-org/react";
import { User } from "@prisma/client";
import { redirect, useParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

export default function Page() {
  const user: User = useSelector(getUser);
  const status = useSelector(getUserStatus);
  const error = useSelector(getUserError);
  const { id } = useParams();

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

  if (id === user.id) {
    redirect("/profile");
  }

  return (
    <div id="container" className="w-full max-w-[1450px] relative">
      <div className="w-full grid md:grid-cols-[1fr_2fr] gap-8">
        <UserInfo userId={id as string} />
        <Posts userId={id as string} />
      </div>
    </div>
  );
}
