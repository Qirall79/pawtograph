"use client";

import Chat from "@/components/Conversations/Chat";
import ConversationList from "@/components/Conversations/ConversationList";
import ConversationSkeleton from "@/components/Conversations/ConversationSkeleton";
import {
  getConversations,
  getConversationsError,
  getConversationsStatus,
} from "@/features/conversationsSlice";
import { getUser, getUserError, getUserStatus } from "@/features/userSlice";
import { IConversation } from "@/types";
import { Spinner } from "@nextui-org/react";
import { User } from "@prisma/client";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function Page() {
  const user: User = useSelector(getUser);
  const status = useSelector(getUserStatus);
  const error = useSelector(getUserError);
  const conversations: IConversation[] = useSelector(getConversations);
  const conversationsStatus = useSelector(getConversationsStatus);
  const conversationsError = useSelector(getConversationsError);

  if (status === "failed") {
    return <h1>{error}</h1>;
  }

  if (conversationsStatus === "failed") {
    return (
      <div className="bg-white rounded-xl h-auto p-4 overflow-scroll">
        {conversationsError}
      </div>
    );
  }

  if (status === "loading" || !user?.id) {
    return (
      <main className="flex w-screen h-screen flex-col items-center justify-center absolute top-0 left-0">
        <Spinner size="lg" />
      </main>
    );
  }

  if (conversationsStatus === "loading" || true) {
    return (
      <div className="w-full max-w-[1450px] bg-white rounded-xl flex flex-1 flex-col px-4 lg:px-0 gap-4 overflow-hidden">
        <ConversationSkeleton isMobile />
        <ConversationSkeleton isMobile />
        <ConversationSkeleton isMobile />
        <ConversationSkeleton isMobile />
        <ConversationSkeleton isMobile />
        <ConversationSkeleton isMobile />
      </div>
    );
  }

  return (
    <div
      id="container"
      className="w-full flex flex-col flex-1 lg:grid lg:grid-cols-[1fr_3fr] max-w-[1450px] rounded-xl gap-4 lg:gap-8 p-2 pb-1 lg:pb-8 lg:p-8 relative"
    >
      {conversations.map((conversation) => {
        return <div key={conversation.id}>{conversation.id}</div>;
      })}
    </div>
  );
}
