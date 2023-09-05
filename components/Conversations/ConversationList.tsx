import {
  getConversations,
  getConversationsError,
  getConversationsStatus,
} from "@/features/conversationsSlice";
import { getUser } from "@/features/userSlice";
import { IConversation } from "@/types";
import { Avatar, User } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import ConversationSkeleton from "./ConversationSkeleton";
import { Message } from "@prisma/client";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

export default function ConversationList({ id }: { id: string }) {
  const conversations: IConversation[] = useSelector(getConversations);
  const status = useSelector(getConversationsStatus);
  const error = useSelector(getConversationsError);
  const user = useSelector(getUser);
  const timeAgo = new TimeAgo("en-US");

  if (status === "failed") {
    return (
      <div className="bg-white rounded-xl h-auto p-4 overflow-scroll">
        {error}
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="bg-white rounded-xl flex flex-row px-4 lg:px-0 items-center gap-4 h-16 lg:h-auto lg:flex-col lg:items-stretch overflow-hidden">
        <ConversationSkeleton />
        <ConversationSkeleton />
        <ConversationSkeleton />
        <ConversationSkeleton />
        <ConversationSkeleton />
        <ConversationSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl flex flex-row px-4 lg:px-0 items-center gap-4 h-16 lg:h-auto lg:flex-col lg:items-stretch overflow-x-scroll lg:overflow-y-scroll">
      {conversations.length === 0 ? (
        <p>You have no conversations yet</p>
      ) : (
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
                className={`flex bg-transparent justify-between items-center hover:bg-cyan-950 hover:text-white rounded-xl transition ${
                  id === conversation.id
                    ? "lg:bg-cyan-950 text-white"
                    : conversation.seenBy.includes(user.id)
                    ? ""
                    : "lg:bg-blue-200"
                } pr-3`}
              >
                <User
                  avatarProps={{
                    src: conversation.users!.find((u) => u.id !== user.id)
                      ?.image!,
                  }}
                  className={`w-full hidden lg:flex justify-start transition gap-3 font-semibold capitalize p-3`}
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
                />

                <Avatar
                  isBordered
                  color={
                    conversation.id === id
                      ? "primary"
                      : conversation.seenBy.includes(user.id)
                      ? "default"
                      : "danger"
                  }
                  as="button"
                  className="transition-transform flex lg:hidden"
                  src={
                    conversation.users!.find((u) => u.id !== user.id)?.image!
                  }
                />
                <p className="text-xs text-slate-500 hidden lg:flex">
                  {timeAgo.format(new Date(lastMessage.createdAt), "mini-now")}
                </p>
              </Link>
            )
          );
        })
      )}
    </div>
  );
}
