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
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import UserDropdown from "./UserDropdown";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuActive, setMenuActive] = useState(false);

  if (!session) {
    return <></>;
  }

  return (
    <div className="w-screen bg-white text-black py-5 px-[5%] xl:px-0 flex justify-center items-center relative">
      <div className="w-full max-w-[1450px] flex justify-between items-center">
        <div className="w-1/4 flex lg:hidden ">
          <HiOutlineMenuAlt1
            onClick={() => setMenuActive(true)}
            className="text-3xl cursor-pointer"
          />

          <div
            className={`w-screen h-screen bg-slate-900 absolute top-0 left-0 ${
              menuActive ? "translate-y-0" : "-translate-y-full"
            } transition flex flex-col  z-50 items-start p-10 gap-8 text-white`}
          >
            <MdOutlineClose
              onClick={() => setMenuActive(false)}
              className="text-4xl my-8 mx-3 cursor-pointer text-slate-300"
            />
            <Link
              href={"/"}
              className="flex gap-6 items-center py-2 px-4 rounded-2xl hover:bg-slate-600 transition"
            >
              <RiHomeSmile2Line className="text-3xl" />
              <p className="font-medium text-lg">Home</p>
            </Link>

            <Link
              href={"/adopt"}
              className="flex gap-6 items-center py-2 px-4 rounded-2xl hover:bg-slate-600 transition"
            >
              <PiDogBold className="text-3xl" />
              <p className="font-medium text-lg">Adopt</p>
            </Link>

            <Link
              href={"/inbox"}
              className="flex gap-6 items-center py-2 px-4 rounded-2xl hover:bg-slate-600 transition"
            >
              <AiOutlineMessage className="text-3xl" />
              <p className="font-medium text-lg">Messages</p>
            </Link>

            <Link
              href={"/notifications"}
              className="flex gap-6 items-center py-2 px-4 rounded-2xl hover:bg-slate-600 transition"
            >
              <IoMdNotificationsOutline className="text-3xl" />
              <p className="font-medium text-lg">Notifications</p>
            </Link>
          </div>
        </div>
        <div className="w-1/2 lg:w-1/5 flex gap-8 items-center">
          <Link href={"/"} className="hidden lg:flex">
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
            className="w-full lg:w-auto"
            placeholder="Search"
            startContent={
              <CiSearch className="text-black text-xl dark:text-white  pointer-events-none flex-shrink-0 " />
            }
          />
        </div>
        <div className="hidden w-3/5 xl:w-2/5 lg:flex justify-between">
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
        <div className="w-1/4 lg:w-1/5 flex justify-end">
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
