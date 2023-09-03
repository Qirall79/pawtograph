import {
  getConversations,
  getConversationsError,
  getConversationsStatus,
} from "@/features/conversationsSlice";
import { Conversation } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function ConversationList() {
  const conversations: Conversation[] = useSelector(getConversations);
  const status = useSelector(getConversationsStatus);
  const error = useSelector(getConversationsError);

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
    <div className="bg-white rounded-xl h-[750px] overflow-scroll">
      {conversations.length === 0 ? (
        <p>You have no conversations yet</p>
      ) : (
        conversations.map((conversation) => {
          return (
            <Link
              href={"/conversations/" + conversation.id}
              key={conversation.id}
            >
              {conversation.id}
            </Link>
          );
        })
      )}
    </div>
  );
}
