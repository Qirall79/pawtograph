"use client";

import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Link from "next/link";

import { AiFillGoogleCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

export const RegisterForm = () => {
  return (
    <form className="w-full max-w-[500px] flex flex-col items-center gap-5">
      <Input
        type="text"
        label="Username"
        variant="bordered"
        classNames={{
          inputWrapper: ["border-gray-300"],
        }}
      />
      <Input
        type="email"
        label="Email"
        variant="bordered"
        classNames={{
          inputWrapper: ["border-gray-300"],
        }}
      />
      <Input
        type="password"
        label="Password"
        variant="bordered"
        classNames={{
          inputWrapper: ["border-gray-300"],
        }}
      />
      <Input
        type="password"
        label="Confirm Password"
        variant="bordered"
        classNames={{
          inputWrapper: ["border-gray-300"],
        }}
      />
      <div className="mb-3 w-full">
        <input
          className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded-lg border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
          id="formFileLg"
          type="file"
          placeholder="Picture"
        />
        <p className="text-xs text-gray-500 pt-1">Choose a profile picture</p>
      </div>
      <Button
        className="w-full bg-black border-2 border-black hover:bg-transparent hover:text-black text-white font-medium"
        type="submit"
        onClick={() =>
          signIn("credentials", {
            callbackUrl: "/",
          })
        }
      >
        Sign Up
      </Button>
      {/* <hr className="border-t-[2px] rounded-md w-3/5 border-gray-300 my-4" /> */}
      <Button
        startContent={<AiFillGoogleCircle className="text-3xl" />}
        className="w-full font-medium"
        color="danger"
        variant="ghost"
        onClick={() => signIn("google")}
      >
        Continue with Google
      </Button>
      <Button
        startContent={<BsFacebook className="text-2xl" />}
        className="w-full font-medium"
        color="primary"
        variant="ghost"
        onClick={() => signIn("facebook")}
      >
        Continue with Facebook
      </Button>

      <p className="text-sm text-gray-600">
        Already have an account ?{" "}
        <Link href={"/login"} className="text-black font-bold">
          Sign In
        </Link>
      </p>
    </form>
  );
};
