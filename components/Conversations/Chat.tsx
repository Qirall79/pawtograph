import {
  getConversations,
  getConversationsStatus,
} from "@/features/conversationsSlice";
import { getUser, getUserStatus } from "@/features/userSlice";
import { IConversation } from "@/types";
import React from "react";
import { useSelector } from "react-redux";

export default function Chat({ id }: { id: string }) {
  const conversations: IConversation[] = useSelector(getConversations);
  const conversationStatus = useSelector(getConversationsStatus);
  const userStatus = useSelector(getUserStatus);
  const conversation: IConversation | undefined = conversations.find(
    (c) => c.id === id
  );
  const user = useSelector(getUser);

  if (conversationStatus === "fail" || userStatus === "fail") {
    return (
      <div className="bg-white rounded-xl h-[750px] overflow-scroll">
        Something went wrong
      </div>
    );
  }

  if (conversationStatus === "loading" || userStatus === "loading") {
    return (
      <div className="bg-white rounded-xl h-[750px] overflow-scroll">
        loading...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl h-[750px] overflow-scroll">
      <div className="w-full h-full flex flex-col justify-end gap-2">
        {conversation?.messages?.length === 0 ? (
          <p>There are no messages yet !</p>
        ) : (
          conversation?.messages!.map((message) => {
            return (
              <p
                className={`max-w-1/2 p-2 rounded-lg text-white  ${
                  message.authorId === user.id
                    ? "bg-slate-950 self-end"
                    : "bg-blue-600 self-start"
                }`}
              >
                {message.body}
              </p>
            );
          })
        )}
      </div>
      <div></div>
    </div>
  );
}
