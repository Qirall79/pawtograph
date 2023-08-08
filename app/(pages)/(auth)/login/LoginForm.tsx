"use client";

import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import Link from "next/link";

import { AiFillGoogleCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

import { FieldValues, useForm } from "react-hook-form";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const submitForm = async (data: FieldValues) => {
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="w-full max-w-[500px] flex flex-col items-center gap-5"
      onSubmit={handleSubmit(submitForm)}
    >
      <Input
        {...register("email", {
          required: {
            value: true,
            message: "Email field is required",
          },
          pattern: {
            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: "Please enter a valid email",
          },
        })}
        type="text"
        label="Email"
        variant="bordered"
        validationState={errors?.email ? "invalid" : "valid"}
        errorMessage={String(
          errors?.email?.message ? errors?.email?.message : ""
        )}
        classNames={{
          inputWrapper: ["border-gray-300"],
        }}
      />
      <Input
        {...register("password", { required: "Please enter a password" })}
        type="password"
        label="Password"
        variant="bordered"
        validationState={errors?.password ? "invalid" : "valid"}
        errorMessage={String(
          errors?.password?.message ? errors?.password?.message : ""
        )}
        classNames={{
          inputWrapper: ["border-gray-300"],
        }}
      />
      <Button
        className="w-full bg-black border-2 border-black hover:bg-transparent hover:text-black text-white font-medium"
        type="submit"
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

      <p className="text-sm text-gray-600">
        Don't have an account ?{" "}
        <Link
          href={"/register"}
          className="text-black font-bold hover:text-gray-600 transition"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
};
