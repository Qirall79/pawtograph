"use client";

import ConversationSkeleton from "@/components/Conversations/ConversationSkeleton";
import {
  getConversations,
  getConversationsError,
  getConversationsStatus,
} from "@/features/conversationsSlice";
import { getUser, getUserError, getUserStatus } from "@/features/userSlice";
import { IConversation } from "@/types";
import { Spinner, User } from "@nextui-org/react";
import { Message, User as UserType } from "@prisma/client";
import Link from "next/link";
import { useSelector } from "react-redux";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

export default function Page() {
  const user: UserType = useSelector(getUser);
  const status = useSelector(getUserStatus);
  const error = useSelector(getUserError);
  const conversations: IConversation[] = useSelector(getConversations);
  const conversationsStatus = useSelector(getConversationsStatus);
  const conversationsError = useSelector(getConversationsError);
  const timeAgo = new TimeAgo("en-US");

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

  if (conversationsStatus === "loading") {
    return (
      <div className="w-full max-w-[1450px] bg-white rounded-xl flex flex-1 flex-col px-4 lg:px-0 gap-4 overflow-hidden">
        <ConversationSkeleton isMobile />
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
      className="w-full max-w-[1450px] bg-white rounded-xl flex flex-1 flex-col p-4 gap-4 overflow-y-scroll"
    >
      <h1 className="text-2xl">Inbox</h1>
      {conversations?.length > 0 ? (
        conversations.map((conversation) => {
          const lastMessage: Message | null =
            conversation.messages!.length > 0
              ? conversation.messages![conversation.messages!.length - 1]
              : null;

          return (
            lastMessage && (
              <Link
                href={"/conversations/" + conversation.id}
                key={conversation.id}
                className={`flex justify-between items-center hover:bg-slate-200  rounded-xl transition ${
                  conversation.seenBy.includes(user.id) ? "" : "bg-blue-200"
                } pr-3`}
              >
                <User
                  avatarProps={{
                    src: conversation.users!.find((u) => u.id !== user.id)
                      ?.image!,
                  }}
                  className={`w-full flex justify-start transition gap-3 font-semibold capitalize p-3 `}
                  name={conversation.users!.find((u) => u.id !== user.id)?.name}
                  description={
                    <p
                      className={`${
                        conversation.seenBy.includes(user.id)
                          ? ""
                          : "font-bold text-blue-600"
                      }`}
                    >
                      {lastMessage.body!.length > 12
                        ? lastMessage.body!.substring(0, 12) + "..."
                        : lastMessage.body}
                    </p>
                  }
                />{" "}
                <p className="text-sm text-slate-500">
                  {timeAgo.format(new Date(lastMessage.createdAt), "mini-now")}
                </p>
              </Link>
            )
          );
        })
      ) : (
        <p>You have no conversations yet !</p>
      )}
    </div>
  );
}
