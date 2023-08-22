"use client";
import { Comment as CommentType, User } from "@prisma/client";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import axios from "axios";
interface IComment extends CommentType {
  author: User;
}

export default function Comments({ comments }: { comments: IComment[] }) {
  const [coms, setComments] = useState<IComment | []>([]);

  const fetchComments = async () => {
    try {
      const res = await axios.get("/api/comments/something");
      console.log(res.data.postId);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
      {comments.map((comment) => {
        return <Comment comment={comment} />;
      })}
    </div>
  );
}
