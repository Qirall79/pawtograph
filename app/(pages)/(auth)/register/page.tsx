"use client";
import { redirect } from "next/navigation";
import { RegisterForm } from "./RegisterForm";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";

export default function page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <TailSpin
        height="50"
        width="50"
        color="#27374D"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
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
          className="absolute -top-12 left-1/2 -translate-x-1/2"
        />
        <RegisterForm />
      </div>
      <div className=" h-full flex flex-1">
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
