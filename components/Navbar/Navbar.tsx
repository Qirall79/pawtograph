"use client";
import { Input, Spinner, User } from "@nextui-org/react";
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
import { useEffect, useState } from "react";
import NotificationPopover from "./NotificationPopover";
import MessagesPopover from "./MessagesPopover";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, getUser, getUserStatus } from "@/features/userSlice";
import { AppThunkDispatch } from "@/app/store";
import { FaRegFaceSadTear } from "react-icons/fa6";
import MobileNotifications from "./MobileNotifications";
import MobileMessages from "./MobileMessages";
import { User as UserType } from "@prisma/client";
import useSwr from "swr";

export default function Navbar() {
  const user = useSelector(getUser);
  const [menuActive, setMenuActive] = useState(false);
  const status = useSelector(getUserStatus);
  const dispatch = useDispatch<AppThunkDispatch>();
  const [search, setSearch] = useState(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const [found, setFound] = useState<UserType[]>([]);

  const { data, isLoading, error } = useSwr(
    "/api/users/search",
    (url) =>
      fetch(url, {
        cache: "no-cache",
      }).then((res) => res.json()),
    {
      refreshInterval: 1000,
    }
  );

  const handleChange = (e: any) => {
    if (e.target.value === "") {
      setSearch(false);
      return;
    }
    const usersCopy = [...users];
    const filteredUsers = usersCopy.filter((u) =>
      u.name!.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFound([...filteredUsers]);
    setSearch(true);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      setUsers(data.users);
    }
  }, [data, isLoading]);

  if (!user?.id) {
    return <></>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full bg-white  py-5 px-[5%] 2xl:px-0 flex justify-center items-center relative">
      <div className="w-full max-w-[1450px] flex justify-between items-center">
        <div className="w-1/5 flex lg:hidden ">
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
              href={"/lost"}
              className="flex gap-6 items-center py-2 px-4 rounded-2xl hover:bg-slate-600 transition"
            >
              <FaRegFaceSadTear className="text-3xl" />
              <p className="font-medium text-lg">Lost</p>
            </Link>

            <Link
              href={"/conversations"}
              className="flex gap-6 items-center py-2 px-4 rounded-2xl hover:bg-slate-600 transition"
            >
              <MobileMessages />
              <p className="font-medium text-lg">Messages</p>
            </Link>

            <Link
              href={"/notifications"}
              className="flex gap-6 items-center py-2 px-4 rounded-2xl hover:bg-slate-600 transition"
            >
              <MobileNotifications />
              <p className="font-medium text-lg">Notifications</p>
            </Link>
          </div>
        </div>
        <div className="w-3/5 lg:w-1/4 flex gap-8 items-center">
          <Link href={"/"} className="hidden lg:flex">
            <Image
              src={"/images/logo-black.png"}
              alt="logo"
              width={50}
              height={50}
            />
          </Link>
          <div className="w-full lg:w-auto relative">
            <Input
              onChange={handleChange}
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
            {search && (
              <div className="w-full flex flex-col gap-3 items-start bg-white border h-fit max-h-[400px] overflow-y-scroll p-4 absolute rounded-lg z-50">
                {isLoading ? (
                  <Spinner className="self-center" color="default" size="sm" />
                ) : found.length > 0 ? (
                  found.map((user) => {
                    return (
                      <Link
                        className="hover:bg-slate-200 w-full p-2 rounded-lg"
                        key={user.id}
                        href={"/profile/" + user.id}
                      >
                        <User
                          avatarProps={{
                            src: user.image || "",
                            size: "sm",
                          }}
                          className="transition-transform gap-2 font-semibold capitalize"
                          name={user.name}
                        />
                      </Link>
                    );
                  })
                ) : (
                  "No users found"
                )}
              </div>
            )}
          </div>
        </div>
        <div className="hidden w-3/5 xl:w-2/5 lg:flex justify-center gap-6">
          <Link
            href={"/"}
            className="flex gap-2 items-center py-2 px-4 rounded-2xl hover:bg-slate-200 transition"
          >
            <RiHomeSmile2Line className="text-2xl" />
          </Link>

          <Link
            href={"/adopt"}
            className="flex gap-2 items-center py-2 px-4 rounded-2xl hover:bg-slate-200 transition"
          >
            <PiDogBold className="text-2xl" />
          </Link>

          <Link
            href={"/lost"}
            className="flex gap-2 items-center py-2 px-4 rounded-2xl hover:bg-slate-200 transition"
          >
            <FaRegFaceSadTear className="text-xl" />
          </Link>

          <MessagesPopover />

          <NotificationPopover />
        </div>
        <div className="w-1/5 lg:w-1/5 flex justify-end">
          <UserDropdown
            user={{
              name: user?.name!,
              image: user?.image!,
            }}
          />
        </div>
      </div>
    </div>
  );
}
