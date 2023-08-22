import { User } from "@nextui-org/react";
import { Comment, User as UserType } from "@prisma/client";
import { useState } from "react";

interface IComment extends Comment {
  author: UserType;
}

export default function Comment({ comment }: { comment: IComment }) {
  const [repliesActivated, setRepliesActivated] = useState(false);

  return (
    <div className="w-full flex items-center gap-4 bg-slate-100 p-2 rounded-md">
      <User
        as="button"
        avatarProps={{
          src: comment.author.image || "",
          size: "sm",
        }}
        className="transition-transform gap-2 font-semibold capitalize"
        name={comment.author.name}
      />
      <p>{comment.text}</p>
    </div>
  );
}
