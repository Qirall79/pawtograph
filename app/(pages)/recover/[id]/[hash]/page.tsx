"use client";

import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function Page() {
  const { id, hash } = useParams();
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const sendPassword = async (data: FieldValues) => {
    // check passwords match
    if (data.password !== data.confirm_password) {
      setPasswordsMatch(false);
      return;
    }
    setPasswordsMatch(true);
    try {
      setIsLoading(true);
      await axios.put("/api/recover", {
        newPassword: data.password,
        id,
        hash,
      });
      setSent(true);
      toast.success("Password changed successfully !");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ! please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90%] max-w-[500px] flex flex-col gap-6">
      {sent ? (
        <Link href={"/login"} className="self-center font-bold">
          <Button color="success">Go to login page</Button>
        </Link>
      ) : (
        <>
          <h1 className="text-xl">Recover Password</h1>
          <form className="space-y-4" onSubmit={handleSubmit(sendPassword)}>
            <Input
              {...register("password", {
                required: "Please enter a password",
                minLength: {
                  value: 8,
                  message: "Password must contain at least 8 characters",
                },
              })}
              isDisabled={isLoading}
              validationState={errors?.password ? "invalid" : "valid"}
              errorMessage={String(
                errors?.password?.message ? errors?.password?.message : ""
              )}
              type="password"
              label="New Password"
              variant="bordered"
              classNames={{
                inputWrapper: ["border-gray-300"],
              }}
            />
            <Input
              {...register("confirm_password")}
              isDisabled={isLoading}
              validationState={!passwordsMatch ? "invalid" : "valid"}
              errorMessage={passwordsMatch ? "" : "Passwords don't match"}
              type="password"
              label="Confirm New Password"
              variant="bordered"
              classNames={{
                inputWrapper: ["border-gray-300"],
              }}
            />
            <Button type="submit" color="primary" isLoading={isLoading}>
              Set New Password
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
