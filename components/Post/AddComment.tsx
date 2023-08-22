"use client";
import { getUser } from "@/features/userSlice";
import { Avatar, Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { MdDone } from "react-icons/md";
import { useSelector } from "react-redux";

export default function AddComment() {
  const user = useSelector(getUser);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-full flex items-center gap-3 rounded-md">
      <Avatar size="md" src={user.image} />
      <form className="flex flex-1 gap-3">
        <Input
          isDisabled={isLoading}
          required
          name="text"
          placeholder="write a comment..."
        />
        <Button
          type="submit"
          isLoading={isLoading}
          isIconOnly
          variant="ghost"
          startContent={<MdDone className="text-2xl" />}
        />
      </form>
    </div>
  );
}
