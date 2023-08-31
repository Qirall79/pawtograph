import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";

export default function MessagesPopover() {
  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger className="cursor-pointer">
        <div className="flex gap-2 items-center py-2 px-4 rounded-2xl hover:bg-slate-200 transition">
          <AiOutlineMessage className="text-2xl" />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2 flex flex-col gap-3">
          <div className="text-small font-bold">Inbox</div>
          <div className="text-sm">Message from Jilali</div>
          <div className="text-sm">Message from Mohammed</div>
          <div className="text-sm">Message from Anas</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
