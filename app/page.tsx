"use client";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Loading...</h1>
      </main>
    );
  }

  if (!session) {
    redirect("/login");
  }
  console.log(session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello Someone</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </main>
  );
}
