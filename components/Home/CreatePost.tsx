"use client";

import { getUser } from "@/features/userSlice";
import { Avatar, Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillImageFill } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function CreatePost() {
  const user = useSelector(getUser);

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

  return (
    <div className=" p-6 bg-white rounded-xl">
      <form className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <Avatar className="w-[72px] h-16" src={user.image} />
          <Input type="text" placeholder="Share something..." />
        </div>
        <hr className="border-slate-200 w-3/5 self-center" />

        <div className="w-full flex flex-col items-center gap-4">
          {imageFileUrl && (
            <div className="relative w-[300px]">
              <AiFillCloseCircle
                onClick={() => deleteImageFile()}
                className="absolute top-2 right-2 text-lg hover:scale-125 transition cursor-pointer"
              />
              <Image
                className="w-full"
                src={imageFileUrl.toString()}
                width={300}
                height={300}
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
          <Button
            onClick={handleButtonClick}
            color="primary"
            variant="ghost"
            className="w-full font-semibold"
            startContent={<BsFillImageFill className="text-xl" />}
          >
            Upload Image
          </Button>
        </div>
        <hr className="border-slate-200 w-3/5 self-center" />
        <Button variant="solid" color="secondary" className="font-bold">
          {" "}
          Publish
        </Button>
      </form>
    </div>
  );
}
