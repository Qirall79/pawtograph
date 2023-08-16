"use client";
import Navbar from "@/components/Navbar/Navbar";
import {
  fetchUser,
  getUser,
  getUserError,
  getUserStatus,
} from "@/features/userSlice";
import { Spinner } from "@nextui-org/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch } from "./store";

export default function Home() {
  const user = useSelector(getUser);
  const status = useSelector(getUserStatus);
  const dispatch = useDispatch<AppThunkDispatch>();
  const error = useSelector(getUserError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUser());
    }
  }, [status, dispatch]);

  if (status === "failed") {
    return <h1>{error}</h1>;
  }

  if (status === "loading" || !user?.id) {
    return (
      <main className="flex w-screen h-screen flex-col items-center justify-center">
        <Spinner size="lg" />
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-between p-24">
        <h1>Content here</h1>
      </main>
    </>
  );
}
