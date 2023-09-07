"use client";

import {
  getUser,
  getUserError,
  getUserStatus,
  updateNotification,
} from "@/features/userSlice";
import { IUser } from "@/types";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "javascript-time-ago";

export default function Page() {
  const user: IUser = useSelector(getUser);
  const status = useSelector(getUserStatus);
  const error = useSelector(getUserError);
  const dispatch = useDispatch();

  const timeAgo = new TimeAgo("en-US");

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
    return () => {
      updateNotifications();
    };
  }, []);

  if (status === "failed") {
    return <h1>{error}</h1>;
  }

  if (status === "loading" || !user?.id) {
    return (
      <main className="flex w-screen h-screen flex-col items-center justify-center absolute top-0 left-0">
        <Spinner size="lg" />
      </main>
    );
  }

  return (
    <div className="w-full max-w-[1450px] p-4 bg-white rounded-xl flex flex-1 flex-col gap-3 overflow-y-scroll">
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
                {timeAgo.format(new Date(notification.createdAt), "mini-now")}
              </p>
            </Link>
          );
        })
      ) : (
        <p>There are no notifications</p>
      )}
    </div>
  );
}
