"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { TailSpin } from "react-loader-spinner";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="flex w-screen h-screen flex-col items-center justify-center">
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
      </main>
    );
  }

  if (!session) {
    redirect("/login");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="capitalize">Hello {session.user?.name}</h1>
      <Image
        src={session.user?.image || ""}
        alt="profile"
        width={200}
        height={200}
      />
      <button onClick={() => signOut()}>Sign Out</button>
    </main>
  );
}
