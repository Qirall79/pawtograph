"use client";

import { getUser } from "@/features/userSlice";
import { Avatar, Button, Input } from "@nextui-org/react";
import { BsFillImageFill } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function CreatePost() {
  const user = useSelector(getUser);

  return (
    <div className=" p-6 bg-white rounded-xl">
      <form className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <Avatar className="w-[72px] h-16" src={user.image} />
          <Input type="text" placeholder="Share something..." />
        </div>
        <hr className="border-slate-200 w-3/5 self-center" />
        <Button
          variant="ghost"
          color="primary"
          className="font-bold"
          startContent={<BsFillImageFill className="text-xl" />}
        >
          Upload Image
        </Button>
        <hr className="border-slate-200 w-3/5 self-center" />
        <Button variant="solid" color="secondary" className="font-bold">
          {" "}
          Publish
        </Button>
      </form>
    </div>
  );
}
