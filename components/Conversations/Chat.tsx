import {
  addMessage,
  getConversations,
  getConversationsStatus,
  updateConversation,
} from "@/features/conversationsSlice";
import { getUser, getUserStatus } from "@/features/userSlice";
import { pusherClient } from "@/lib/pusher";
import { IConversation } from "@/types";
import { Button, Input } from "@nextui-org/react";
import { Message, User } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsSendFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import MessagesSkeleton from "./MessagesSkeleton";

export default function Chat({ id }: { id: string }) {
  const dispatch = useDispatch();
  const conversations: IConversation[] = useSelector(getConversations);
  const conversationStatus = useSelector(getConversationsStatus);
  const userStatus = useSelector(getUserStatus);
  const [conversation, setConversation] = useState<IConversation>();
  const user: User = useSelector(getUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      body: "",
    },
  });
  const bottomRef = useRef<HTMLDivElement>(null);

  const setSeen = async () => {
    try {
      dispatch(updateConversation({ conversationId: id, userId: user.id }));
      await axios.put("/api/conversations/" + user.id, {
        id: conversation!.id,
        seenBy: [...conversation!.seenBy, user.id],
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ! Please try again later");
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [conversation]);

  useEffect(() => {
    if (conversationStatus === "fulfilled") {
      setConversation(conversations.find((c) => c.id === id));

      if (conversation?.id) {
        setSeen();
      }
    }
  }, [conversations, conversationStatus, conversation]);

  useEffect(() => {
    pusherClient.subscribe(id);
    pusherClient.bind("message:new", (data: Message) => {
      if (data.authorId !== user.id) {
        dispatch(addMessage(data));
      }
    });

    return () => {
      pusherClient.unsubscribe(id);
      pusherClient.unbind("message:new", (data: Message) => {
        dispatch(addMessage(data));
      });
    };
  }, []);

  const sendMessage = async (data: FieldValues) => {
    try {
      const newMessage = {
        body: data.body,
        conversationId: id,
        authorId: user.id,
      };
      dispatch(addMessage(newMessage as Message));
      reset();
      await axios.post("/api/messages", newMessage);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ! please try again later");
    }
  };

  if (conversationStatus === "fail" || userStatus === "fail") {
    return (
      <div className="bg-white rounded-xl h-[750px] overflow-scroll">
        Something went wrong
      </div>
    );
  }

  if (conversationStatus === "loading" || userStatus === "loading") {
    return (
      <div className="flex flex-col justify-center gap-4 bg-white rounded-xl h-[750px] overflow-scroll">
        <MessagesSkeleton />
        <MessagesSkeleton />
        <MessagesSkeleton />
        <MessagesSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-col justify-between rounded-xl h-[750px] overflow-scroll gap-6 p-4">
      <div className="w-full flex flex-grow flex-col justify-end gap-2">
        {conversation?.messages?.length === 0 ? (
          <p>There are no messages yet !</p>
        ) : (
          conversation?.messages!.map((message) => {
            return (
              <p
                key={message.id}
                className={`max-w-1/2 p-2 rounded-lg text-white  ${
                  message.authorId === user.id
                    ? "bg-blue-600 self-end"
                    : "bg-slate-950 self-start"
                }`}
              >
                {message.body}
              </p>
            );
          })
        )}
      </div>
      <form onSubmit={handleSubmit(sendMessage)} className="flex gap-2">
        <Input
          {...register("body", { required: true })}
          placeholder="Send message..."
          validationState={errors?.body ? "invalid" : "valid"}
          defaultValue={""}
        />
        <Button
          type="submit"
          color="primary"
          isIconOnly
          endContent={<BsSendFill className="text-lg" />}
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
}
