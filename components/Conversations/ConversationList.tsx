import {
  getConversations,
  getConversationsError,
  getConversationsStatus,
} from "@/features/conversationsSlice";
import { getUser } from "@/features/userSlice";
import { IConversation } from "@/types";
import { User } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function ConversationList({ id }: { id: string }) {
  const conversations: IConversation[] = useSelector(getConversations);
  const status = useSelector(getConversationsStatus);
  const error = useSelector(getConversationsError);
  const user = useSelector(getUser);

  if (status === "failed") {
    return (
      <div className="bg-white rounded-xl h-[750px] overflow-scroll">
        {error}
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="bg-white rounded-xl h-[750px] overflow-scroll">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl h-[750px] overflow-y-scroll">
      {conversations.length === 0 ? (
        <p>You have no conversations yet</p>
      ) : (
        conversations.map((conversation) => {
          return (
            <Link
              href={"/conversations/" + conversation.id}
              key={conversation.id}
            >
              <User
                as="button"
                avatarProps={{
                  src: conversation.users!.find((u) => u.id !== user.id)
                    ?.image!,
                }}
                className={`w-full justify-start transition gap-3 font-semibold hidden lg:flex capitalize p-3 hover:bg-cyan-950 hover:text-white ${
                  id === conversation.id
                    ? "bg-cyan-950 text-white"
                    : conversation.seenBy.includes(user.id)
                    ? ""
                    : "bg-blue-200"
                }`}
                name={conversation.users!.find((u) => u.id !== user.id)?.name}
                description={
                  <p
                    className={`${
                      conversation.seenBy.includes(user.id)
                        ? ""
                        : "font-bold text-blue-600"
                    }`}
                  >
                    {conversation.messages!.length > 0
                      ? conversation.messages![
                          conversation.messages!.length - 1
                        ].body
                      : ""}
                  </p>
                }
              />
            </Link>
          );
        })
      )}
    </div>
  );
}
