"use client";

import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

export default function Page() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const sendRecovery = async (data: FieldValues) => {
    try {
      setSent(true);
      await axios.post("/api/recover", data);
    } catch (error) {
      toast.error("Something went wrong ! Please try again later");
    }
  };

  return (
    <div className="w-[90%] max-w-[500px] flex flex-col gap-6">
      {sent ? (
        <div className="w-full flex flex-col gap-6 items-center text-center">
          <IoCheckmarkDoneCircle className="text-6xl text-green-600" />
          <p>
            The password recovery request was sent successfully. If there's any
            account associated to this email you will receive a password
            recovery link on your email inbox.
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-xl">Recover Password</h1>
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
            validationState={errors?.email ? "invalid" : "valid"}
            errorMessage={String(
              errors?.email?.message ? errors?.email?.message : ""
            )}
            type="email"
            label="Email"
            variant="bordered"
            classNames={{
              inputWrapper: ["border-gray-300"],
            }}
          />
          <Button
            type="submit"
            onClick={handleSubmit(sendRecovery)}
            color="secondary"
          >
            Recover Password
          </Button>{" "}
        </>
      )}
    </div>
  );
}
