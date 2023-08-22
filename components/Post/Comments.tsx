"use client";
import { Comment as CommentType, User } from "@prisma/client";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import axios from "axios";
import AddComment from "./AddComment";
interface IComment extends CommentType {
  author: User;
}

export default function Comments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/comments/" + postId);
      setComments(res.data.comments);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {comments.map((comment) => {
        return <Comment comment={comment} />;
      })}
      <AddComment
        postId={postId}
        comments={comments}
        setComments={setComments}
      />
    </div>
  );
}
