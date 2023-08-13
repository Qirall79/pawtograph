"use client";
import { redirect } from "next/navigation";
import { LoginForm } from "./LoginForm";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";

export default function Page() {
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
      <div className="flex flex-col flex-1 items-center justify-center relative px-5 md:px-1">
        <Image
          src={"/images/logo-full.png"}
          alt="logo"
          width={200}
          height={200}
          className="absolute w-[120px] h-[120px] md:w-[200px] md:h-[200px] top-5 left-1/2 -translate-x-1/2"
        />
        <LoginForm />
      </div>
      <div className=" h-full md:flex flex-1 hidden">
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
