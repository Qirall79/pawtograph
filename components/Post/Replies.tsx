"use client";

import { Comment, Reply as ReplyType, User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Reply from "./Reply";
import AddReply from "./AddReply";

interface IReply extends ReplyType {
  author: User;
}

interface IComment extends Comment {
  author: User;
  Replies: IReply[];
}

export default function Replies({
  comment,
  comments,
  setComments,
  setRepliesCount,
  deleteReplyFromComment,
}: {
  comment: IComment;
  comments: IComment[];
  setComments: any;
  setRepliesCount: any;
  deleteReplyFromComment: any;
}) {
  const [replies, setReplies] = useState([...comment.Replies]);

  useEffect(() => {
    setRepliesCount(replies.length);
  }, [replies]);

  return (
    <div className="pl-10 pt-3 flex flex-col gap-2">
      {replies.map((reply: IReply) => {
        return (
          <Reply
            reply={reply}
            replies={replies}
            setReplies={setReplies}
            deleteReplyFromComment={deleteReplyFromComment}
          />
        );
      })}
      <AddReply
        comment={comment}
        replies={replies}
        setReplies={setReplies}
        comments={comments}
        setComments={setComments}
      />
    </div>
  );
}
