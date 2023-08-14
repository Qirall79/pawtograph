"use client";
import Navbar from "@/components/Navbar";
import { Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="flex w-screen h-screen flex-col items-center justify-center">
        <Spinner size="lg" />
      </main>
    );
  }

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-between p-24">
        <h1>Content here</h1>
      </main>
    </>
  );
}
