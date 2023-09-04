import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Badge,
  User,
} from "@nextui-org/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addConversation,
  fetchConversations,
  getConversations,
  getConversationsError,
  getConversationsStatus,
} from "@/features/conversationsSlice";
import { AppThunkDispatch } from "@/app/store";
import { IConversation, IUser } from "@/types";
import Link from "next/link";
import { getUser } from "@/features/userSlice";
import { pusherClient } from "@/lib/pusher";

export default function MessagesPopover() {
  const conversations: IConversation[] = useSelector(getConversations);
  const user: IUser = useSelector(getUser);
  const status = useSelector(getConversationsStatus);
  const error = useSelector(getConversationsError);
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

  useEffect(() => {
    pusherClient.subscribe(user.id);
    pusherClient.bind("conversations", (data: IConversation) => {
      dispatch(addConversation(data));
    });

    return () => {
      pusherClient.unsubscribe(user.id);
      pusherClient.unbind("conversations", (data: IConversation) => {
        dispatch(addConversation(data));
      });
    };
  }, []);

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
        <div className="px-1 py-2 flex flex-col gap-3 max-h-[500px] overflow-y-scroll">
          <div className="text-small font-bold">Inbox</div>
          {status === "failed" ? (
            <p>{error}</p>
          ) : status === "loading" ? (
            <p>Loading...</p>
          ) : conversations.length === 0 ? (
            <p>You have no conversations yet</p>
          ) : (
            conversations.map((conversation) => {
              return (
                conversation.messages!.length > 0 && (
                  <Link
                    href={"/conversations/" + conversation.id}
                    key={conversation.id}
                  >
                    <User
                      avatarProps={{
                        src: conversation.users!.find((u) => u.id !== user.id)
                          ?.image!,
                        size: "sm",
                      }}
                      className={`w-full text-sm justify-start transition gap-3 font-semibold hidden lg:flex capitalize p-1 hover:bg-slate-200 ${
                        conversation.seenBy.includes(user.id)
                          ? ""
                          : "bg-blue-200"
                      }`}
                      name={
                        conversation.users!.find((u) => u.id !== user.id)?.name
                      }
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
                              ].body!.substring(0, 12) +
                              (conversation.messages![
                                conversation.messages!.length - 1
                              ].body!.length > 12
                                ? "..."
                                : "")
                            : ""}
                        </p>
                      }
                    />
                  </Link>
                )
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
