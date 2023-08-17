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
      <main className="w-full py-5 px-[5%] 2xl:px-0 flex justify-center items-center">
        <div
          id="container"
          className="w-full max-w-[1450px] grid grid-cols-[1fr_2fr_1fr] grid-rows-1 gap-10"
        >
          <div className="h-[500px] bg-white rounded-xl">Suggestions</div>
          <div className="h-full flex flex-col gap-6">
            <div className="h-[200px] bg-white rounded-xl">Create post</div>
            <div className="h-[500px] bg-white rounded-xl">An actual post</div>
          </div>
          <div className="h-[500px] bg-white rounded-xl">Friends</div>
        </div>
      </main>
    </>
  );
}
