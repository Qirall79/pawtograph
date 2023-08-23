"use client";

import { addPost } from "@/features/postsSlice";
import { getUser } from "@/features/userSlice";
import uploadFile from "@/lib/uploadFile";
import { Avatar, Button, Input } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillImageFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

interface IFields {
  text: string;
  photo?: string;
  authorId: string;
}

export default function CreatePost() {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFields>();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | ArrayBuffer | null>(
    null
  );

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const deleteImageFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setImageFileUrl(null);
    }
  };

  const convertToUrl = () => {
    if (
      FileReader &&
      fileInputRef.current &&
      fileInputRef.current.files &&
      fileInputRef.current.files[0]
    ) {
      const fr = new FileReader();
      fr.onload = () => {
        setImageFileUrl(fr.result);
      };
      fr.readAsDataURL(fileInputRef.current.files[0]);
    } else {
      setImageFileUrl(null);
    }
  };

  const submitPost = async (data: IFields) => {
    setIsLoading(true);
    if (
      fileInputRef.current &&
      fileInputRef.current.files &&
      fileInputRef.current.files[0]
    ) {
      data.photo = await uploadFile(fileInputRef.current.files[0]);
    }
    data.authorId = user.id;

    try {
      const response = await axios.post("/api/posts", data);
      setIsLoading(false);
      reset();
      deleteImageFile();
      dispatch(addPost(response.data.post));
      toast.success("Post added successfully");
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className=" p-6 bg-white rounded-xl">
      <form className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <Avatar className="w-[76px] h-16" src={user.image} />
          <Input
            {...register("text", { required: "Post text is required" })}
            type="text"
            placeholder="Share something..."
            validationState={errors?.text ? "invalid" : "valid"}
            errorMessage={String(
              errors?.text?.message ? errors?.text?.message : ""
            )}
            isDisabled={isLoading}
          />
          <Button
            isDisabled={isLoading}
            onClick={handleButtonClick}
            size="sm"
            variant="ghost"
            className="!bg-[#0070F0] border-[#0070F0] !text-white hover:!bg-white hover:!text-[#0070F0] font-semibold"
            startContent={<BsFillImageFill className="text-xl" />}
            isIconOnly
          />
        </div>

        <div className="w-full flex flex-col items-center gap-4">
          {imageFileUrl && (
            <div className="relative w-[300px]">
              <AiFillCloseCircle
                onClick={() => deleteImageFile()}
                className="absolute top-2 right-2 text-lg hover:scale-125 transition cursor-pointer"
              />
              <Image
                className="w-full rounded-lg"
                src={imageFileUrl.toString()}
                width={200}
                height={200}
                alt="preview"
              />
            </div>
          )}
          <input
            onChange={() => convertToUrl()}
            ref={fileInputRef}
            className="hidden"
            id="formFileLg"
            type="file"
          />
        </div>
        <Button
          isLoading={isLoading}
          onClick={handleSubmit(submitPost)}
          variant="solid"
          color="primary"
          className="font-bold"
        >
          {" "}
          Publish
        </Button>
      </form>
    </div>
  );
}
