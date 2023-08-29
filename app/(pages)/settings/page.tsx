"use client";
import UpdateForm from "@/components/Settings/UpdateForm";
import { getUser, getUserError, getUserStatus } from "@/features/userSlice";
import { Input, Spinner } from "@nextui-org/react";
import { User } from "@prisma/client";
import React from "react";
import { useSelector } from "react-redux";

export default function Page() {
  const user: User = useSelector(getUser);
  const status = useSelector(getUserStatus);
  const error = useSelector(getUserError);

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

  return (
    <div
      id="container"
      className="w-full flex justify-center max-w-[1450px] relative"
    >
      <div className="w-full max-w-[800px] p-8 flex flex-col bg-white rounded-lg">
        <h2 className="text-2xl font-semibold mb-12">Settings</h2>
        <UpdateForm />
      </div>
    </div>
  );
}
