import { getUser } from "@/features/userSlice";
import { IUser } from "@/types";
import { Badge } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";

export default function MobileNotifications() {
  const user: IUser = useSelector(getUser);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (user.Notifications) {
      setCount(user.Notifications?.filter((n) => !n.seen).length || 0);
    }
  }, [user]);

  return (
    <Badge content={count} color="primary" isInvisible={count === 0}>
      <IoMdNotificationsOutline className="text-3xl" />
    </Badge>
  );
}
