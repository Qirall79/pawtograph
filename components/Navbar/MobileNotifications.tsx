import { addNotification, getUser } from "@/features/userSlice";
import { pusherClient } from "@/lib/pusher";
import { IUser } from "@/types";
import { Badge } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

export default function MobileNotifications() {
  const user: IUser = useSelector(getUser);
  const dispatch = useDispatch();
  const [count, setCount] = useState(
    user.Notifications?.filter((n) => !n.seen).length || 0
  );

  const displayNotification = (data: any) => {
    dispatch(addNotification(data));
    setCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    pusherClient.subscribe(user.id);
    pusherClient.bind("notification", displayNotification);

    return () => {
      pusherClient.unsubscribe(user.id);
      pusherClient.unbind("notification", displayNotification);
    };
  }, []);

  return (
    <Badge content={count} color="primary" isInvisible={count === 0}>
      <IoMdNotificationsOutline className="text-3xl" />
    </Badge>
  );
}
