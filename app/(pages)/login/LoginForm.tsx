"use client";

import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";

import { AiFillGoogleCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

export const LoginForm = () => {
  return (
    <form className="w-full max-w-[500px] flex flex-col items-center gap-5">
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
      <Button
        className="w-full bg-black border-2 border-black hover:bg-transparent hover:text-black text-white font-medium"
        type="submit"
        onClick={() =>
          signIn("credentials", {
            callbackUrl: "/",
          })
        }
      >
        Sign In
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
    </form>
  );
};
