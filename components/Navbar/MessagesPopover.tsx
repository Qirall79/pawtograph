import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Badge,
} from "@nextui-org/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchConversations,
  getConversations,
  getConversationsError,
  getConversationsStatus,
} from "@/features/conversationsSlice";
import { AppThunkDispatch } from "@/app/store";
import { Conversation } from "@prisma/client";

export default function MessagesPopover() {
  const conversations: Conversation[] = useSelector(getConversations);
  const status = useSelector(getConversationsStatus);
  const error = useSelector(getConversationsError);
  const dispatch = useDispatch<AppThunkDispatch>();
  const [count, setCount] = useState(
    conversations.filter((c) => !c.seen).length
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchConversations());
    }
  }, [dispatch]);

  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger className="cursor-pointer">
        <div className="flex gap-2 items-center py-2 px-4 rounded-2xl hover:bg-slate-200 transition">
          <Badge content={count} color="primary" isInvisible={count === 0}>
            <AiOutlineMessage className="text-2xl" />
          </Badge>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2 flex flex-col gap-3">
          <div className="text-small font-bold">Inbox</div>
          {status === "failed" ? (
            <p>{error}</p>
          ) : status === "loading" ? (
            <p>Loading...</p>
          ) : conversations.length === 0 ? (
            <p>You have no conversations yet</p>
          ) : (
            conversations.map((conversation) => {
              return <div key={conversation.id}>{conversation.id}</div>;
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
