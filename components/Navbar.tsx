"use client";
import { Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { CiSearch } from "react-icons/ci";
import { RiHomeSmile2Line } from "react-icons/ri";
import { PiDogBold } from "react-icons/pi";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import UserDropdown from "./UserDropdown";

export default function Navbar() {
  const { data: session } = useSession();

  if (!session) {
    return <></>;
  }

  return (
    <div className="w-screen bg-white text-black py-5 flex justify-center items-center">
      <div className="w-full max-w-[1450px] flex justify-between items-center">
        <div className="w-1/5 flex gap-8 items-center">
          <Link href={"/"}>
            <Image
              src={"/images/logo-black.png"}
              alt="logo"
              width={50}
              height={50}
            />
          </Link>
          <Input
            isClearable
            radius="lg"
            classNames={{
              inputWrapper: ["!cursor-text"],
            }}
            placeholder="Search"
            startContent={
              <CiSearch className="text-black text-xl dark:text-white/90  pointer-events-none flex-shrink-0" />
            }
          />
        </div>
        <div className="w-2/5 flex justify-between">
          <Link
            href={"/"}
            className="flex gap-2 items-center py-2 px-4 rounded-2xl hover:bg-slate-200 transition"
          >
            <RiHomeSmile2Line className="text-xl" />
            <p className="font-medium text-sm">Home</p>
          </Link>

          <Link
            href={"/"}
            className="flex gap-2 items-center py-2 px-4 rounded-2xl hover:bg-slate-200 transition"
          >
            <PiDogBold className="text-xl" />
            <p className="font-medium text-sm">Adopt</p>
          </Link>

          <Link
            href={"/"}
            className="flex gap-2 items-center py-2 px-4 rounded-2xl hover:bg-slate-200 transition"
          >
            <AiOutlineMessage className="text-xl" />
            <p className="font-medium text-sm">Messages</p>
          </Link>

          <Link
            href={"/"}
            className="flex gap-2 items-center py-2 px-4 rounded-2xl hover:bg-slate-200 transition"
          >
            <IoMdNotificationsOutline className="text-xl" />
            <p className="font-medium text-sm">Notifications</p>
          </Link>
        </div>
        <div className="w-1/5 flex justify-end">
          <UserDropdown
            user={{
              name: session.user?.name!,
              image: session.user?.image!,
            }}
          />
        </div>
      </div>
    </div>
  );
}
