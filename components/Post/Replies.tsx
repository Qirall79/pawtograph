"use client";

import { Comment, Reply as ReplyType, User } from "@prisma/client";
import React, { useState } from "react";
import Reply from "./Reply";

interface IReply extends ReplyType {
  author: User;
}

interface IComment extends Comment {
  Replies: IReply[];
}

export default function Replies({ comment }: { comment: IComment }) {
  const [replies, setReplies] = useState([...comment.Replies]);

  return (
    <div className="pl-10 pt-3 flex flex-col gap-2">
      {replies.map((reply: IReply) => {
        return (
          <Reply reply={reply} replies={replies} setReplies={setReplies} />
        );
      })}
    </div>
  );
}
