import { AppThunkDispatch } from "@/app/store";
import {
  fetchConversations,
  getConversations,
  getConversationsError,
  getConversationsStatus,
} from "@/features/conversationsSlice";
import { getUser } from "@/features/userSlice";
import { IConversation, IUser } from "@/types";
import { Badge } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function MobileMessages() {
  const conversations: IConversation[] = useSelector(getConversations);
  const user: IUser = useSelector(getUser);
  const status = useSelector(getConversationsStatus);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (status === "fulfilled") {
      setCount(
        conversations.filter(
          (c) => !c.seenBy.includes(user.id) && c.messages!.length > 0
        ).length
      );
    }
  }, [conversations, status]);

  return (
    <Badge content={count} color="primary" isInvisible={count === 0}>
      <AiOutlineMessage className="text-3xl" />
    </Badge>
  );
}
