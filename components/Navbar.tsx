"use client";
import { useSession } from "next-auth/react";
export default function Navbar() {
  const { data: session, status } = useSession();

  if (!session) {
    return <div></div>;
  }

  return (
    <div className="bg-black text-white py-5">
      <h1>this is a Navbar</h1>
    </div>
  );
}
