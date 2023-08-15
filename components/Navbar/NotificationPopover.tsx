import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function NotificationPopover() {
  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger className="cursor-pointer">
        <div className="flex gap-2 items-center py-2 px-4 rounded-2xl hover:bg-slate-200 transition">
          <IoMdNotificationsOutline className="text-xl" />
          <p className="font-medium text-sm">Notifications</p>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2 flex flex-col gap-3">
          <div className="text-small font-bold">Unread Notifications</div>
          <div className="text-sm">
            Walid just liked your post about animals
          </div>
          <div className="text-sm">
            Walid just commented your post about animals
          </div>
          <div className="text-sm">
            Walid just liked your post about animals
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
