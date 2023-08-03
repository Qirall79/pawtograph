"use client";
import { redirect } from "next/navigation";
import { LoginForm } from "./LoginForm";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <h1 className="text-slate-700  text-2xl font-semibold">Loading...</h1>
    );
  }

  if (session) {
    redirect("/");
  }

  return (
    <div className="w-full h-full flex justify-between">
      <div className="flex flex-col flex-1 items-center justify-center relative">
        <Image
          src={"/images/logo.png"}
          alt="logo"
          width={300}
          height={300}
          className="absolute -top-10 left-1/2 -translate-x-1/2"
        />
        <LoginForm />
      </div>
      <div className=" h-full flex flex-1">
        <Image
          src={"/images/bg-cat-1.jpg"}
          width={1120}
          height={1680}
          className="w-full h-full object-cover"
          alt="cat background"
        />
      </div>
    </div>
  );
}
