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
import { useDispatch, useSelector } from "react-redux";

export default function MobileMessages() {
  const conversations: IConversation[] = useSelector(getConversations);
  const user: IUser = useSelector(getUser);
  const status = useSelector(getConversationsStatus);
  const dispatch = useDispatch<AppThunkDispatch>();
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(
      conversations.filter(
        (c) => !c.seenBy.includes(user.id) && c.messages!.length > 0
      ).length
    );
  }, [conversations]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchConversations());
    }
  }, [dispatch]);

  return (
    <Badge content={count} color="primary" isInvisible={count === 0}>
      <AiOutlineMessage className="text-2xl" />
    </Badge>
  );
}
