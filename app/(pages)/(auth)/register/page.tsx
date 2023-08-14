"use client";
import { redirect } from "next/navigation";
import { RegisterForm } from "./RegisterForm";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Spinner } from "@nextui-org/react";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Spinner />;
  }

  if (session) {
    redirect("/");
  }

  return (
    <div className="w-full h-screen flex justify-between">
      <div className="flex flex-col flex-1 items-center justify-center relative px-5 md:px-1">
        <Image
          src={"/images/logo-full.png"}
          alt="logo"
          width={200}
          height={200}
          className="absolute w-[120px] h-[120px] md:w-[160px] md:h-[160px] top-0 md:top-5 left-1/2 -translate-x-1/2"
        />
        <RegisterForm />
      </div>
      <div className=" h-full md:flex flex-1 hidden">
        <Image
          src={"/images/bg-dog.jpg"}
          width={1120}
          height={1680}
          className="w-full h-full object-cover"
          alt="cat background"
        />
      </div>
    </div>
  );
}
