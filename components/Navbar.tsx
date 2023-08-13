"use client";
import { Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { CiSearch } from "react-icons/ci";

export default function Navbar() {
  const { data: session } = useSession();

  if (!session) {
    return <></>;
  }

  return (
    <div className="w-screen bg-white text-black py-5 flex justify-center items-center">
      <div className="w-full max-w-[1450px] flex justify-between">
        <div className="w-1/4 flex gap-5 items-center">
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
      </div>
    </div>
  );
}
