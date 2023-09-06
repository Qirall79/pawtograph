import { getUser, updateUser } from "@/features/userSlice";
import { IUser } from "@/types";
import { Button, Input, Switch } from "@nextui-org/react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdDoneOutline } from "react-icons/md";
import { BiReset } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import uploadFile, { deleteFile } from "@/lib/uploadFile";
import axios from "axios";

export default function UpdateForm() {
  const user: IUser = useSelector(getUser);
  const [isLoading, setIsLoading] = useState(false);
  const [forAdoption, setForAdoption] = useState(user.forAdoption!);
  const [lost, setLost] = useState(user.lost!);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const imageRef = useRef<HTMLInputElement>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | ArrayBuffer | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  // convert currently selected image to url
  const convertToUrl = () => {
    if (
      FileReader &&
      imageRef.current &&
      imageRef.current.files &&
      imageRef.current.files[0]
    ) {
      const fr = new FileReader();
      fr.onload = () => {
        setImageFileUrl(fr.result);
      };
      fr.readAsDataURL(imageRef.current.files[0]);
    } else {
      setImageFileUrl(null);
    }
  };

  const handleButtonClick = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleUpdate = async (data: FieldValues) => {
    data.forAdoption = forAdoption;
    data.lost = lost;

    // check if passwords match
    if (data.password !== data.confirm_password) {
      setError("passwords");
      return;
    }
    // reset error when matched
    else if (data.password === data.confirm_password && error === "passwords") {
      setError("");
    }

    setIsLoading(true);

    // SUbmit update to server
    try {
      if (imageFileUrl) {
        if (
          user.image!.includes("https://pawtograph.s3.eu-west-3.amazonaws.com/")
        ) {
          const splitUrl = user.image!.split("/");
          await deleteFile(splitUrl[splitUrl.length - 1]);
        }
        data.image = await uploadFile(imageRef!.current!.files![0]);
      } else {
        data.image = user.image;
      }
      data.id = user.id;
      data.email = data.email.trim().toLowerCase();

      const res = await axios.put("/api/users/current", data);
      if (!res.data.user) {
        return;
      }
      dispatch(updateUser(res.data.user));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="flex flex-col gap-8"
      >
        <div className="flex gap-6 items-center">
          <Image
            src={imageFileUrl?.toString() || user.image!}
            alt="profile"
            width={150}
            height={150}
            className="rounded-full"
          />
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleButtonClick}
              size="sm"
              color="secondary"
              endContent={<AiTwotoneEdit className="text-lg" />}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                setImageFileUrl("");
              }}
              size="sm"
              endContent={<BiReset className="text-lg" />}
            >
              Reset
            </Button>
          </div>
        </div>

        <Input
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 6,
              message: "Name must contain at least 6 characters",
            },
          })}
          isDisabled={isLoading}
          validationState={errors?.name ? "invalid" : "valid"}
          errorMessage={String(
            errors?.name?.message ? errors?.name?.message : ""
          )}
          type="text"
          label="Name"
          variant="bordered"
          classNames={{
            inputWrapper: ["border-gray-300"],
          }}
          defaultValue={user.name!}
          placeholder={user.name!}
        />
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
          isDisabled={isLoading}
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
          defaultValue={user.email!}
          placeholder={user.email!}
        />
        <Input
          {...register("password", {
            required: false,
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
          validationState={error === "passwords" ? "invalid" : "valid"}
          errorMessage={error === "passwords" ? "Passwords don't match" : ""}
          type="password"
          label="Confirm Password"
          variant="bordered"
          classNames={{
            inputWrapper: ["border-gray-300"],
          }}
        />
        <Switch
          defaultSelected={forAdoption!}
          color="primary"
          onChange={() => {
            setForAdoption(!forAdoption);
          }}
        >
          For adoption
        </Switch>
        <Switch
          defaultSelected={lost}
          color="danger"
          onChange={() => {
            setLost(!lost);
          }}
        >
          Lost
        </Switch>
        <input
          onChange={() => convertToUrl()}
          ref={imageRef}
          className="hidden"
          id="formFileLg"
          type="file"
        />

        <Button
          type="submit"
          color="primary"
          isLoading={isLoading}
          endContent={<MdDoneOutline className="text-lg" />}
          className="font-semibold"
        >
          Save
        </Button>
      </form>
    </>
  );
}
