"use client";

import Chat from "@/components/Conversations/Chat";
import ConversationList from "@/components/Conversations/ConversationList";
import { getUser, getUserError, getUserStatus } from "@/features/userSlice";
import { Spinner } from "@nextui-org/react";
import { User } from "@prisma/client";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function Page() {
  const { id } = useParams();
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
      className="w-full grid grid-cols-[1fr_3fr] max-w-[1450px] rounded-xl gap-8 p-8 relative"
    >
      <ConversationList />
      <Chat />
    </div>
  );
}
