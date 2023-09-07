import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Badge,
} from "@nextui-org/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotification,
  getUser,
  updateNotification,
  updateUser,
} from "@/features/userSlice";
import { IUser } from "@/types";
import { pusherClient } from "@/lib/pusher";
import { toast } from "react-hot-toast";
import Link from "next/link";
import TimeAgo from "javascript-time-ago";

export default function NotificationPopover() {
  const user: IUser = useSelector(getUser);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const timeAgo = new TimeAgo("en-US");

  const displayNotification = (data: any) => {
    dispatch(addNotification(data));
  };

  const updateNotifications = async () => {
    try {
      dispatch(updateNotification(""));
      await fetch("/api/notifications", {
        method: "put",
        body: JSON.stringify({
          id: user.id,
        }),
      });
    } catch (error) {
      toast.error("Something went wrong !");
    }
  };

  useEffect(() => {
    if (user.Notifications) {
      setCount(user.Notifications?.filter((n) => !n.seen).length || 0);
    }
  }, [user]);

  useEffect(() => {
    pusherClient.subscribe(user.id);
    pusherClient.bind("notification", displayNotification);

    return () => {
      pusherClient.unsubscribe(user.id);
      pusherClient.unbind("notification", displayNotification);
    };
  }, []);

  return (
    <Popover onClose={updateNotifications} placement="bottom" showArrow={true}>
      <PopoverTrigger onClick={() => setCount(0)} className="cursor-pointer">
        <div className="flex gap-2 items-center py-2 px-4 rounded-2xl hover:bg-slate-200 transition">
          <Badge content={count} color="primary" isInvisible={count === 0}>
            <IoMdNotificationsOutline className="text-2xl" />
          </Badge>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2 flex flex-col gap-3 max-h-[500px] overflow-y-scroll">
          <div className="text-small font-bold">Notifications</div>
          {user.Notifications!.length ? (
            user.Notifications!.map((notification) => {
              return (
                <Link
                  key={notification.id}
                  href={notification.link}
                  className={`p-2 rounded-md flex justify-between items-center gap-2 text-sm lg:text-md transition hover:bg-slate-200 ${
                    !notification.seen ? "bg-slate-300  " : ""
                  }`}
                >
                  <p>{notification.message}</p>
                  <p className="text-xs text-slate-500">
                    {timeAgo.format(
                      new Date(notification.createdAt),
                      "mini-now"
                    )}
                  </p>
                </Link>
              );
            })
          ) : (
            <p>There are no notifications</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
