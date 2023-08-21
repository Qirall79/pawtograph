"use client";

import { Avatar } from "@nextui-org/react";
import { Post } from "@prisma/client";
import Image from "next/image";

export default function Post({ post }: { post: Post }) {
  return (
    <div className="w-full bg-white rounded-lg">
      <div></div>
      <h2>{post.text}</h2>
      {post.photo && (
        <Image src={post.photo} width={300} height={300} alt="post" />
      )}
    </div>
  );
}
