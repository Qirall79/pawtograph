import { Skeleton } from "@nextui-org/react";
import React from "react";

export default function MessagesSkeleton() {
  return (
    <div className="w-full flex flex-col gap-3 p-4">
      <Skeleton className=" self-start rounded-md w-1/2 max-w-[200px] h-10" />
      <Skeleton className=" self-end rounded-md w-1/2 max-w-[200px] h-10" />
    </div>
  );
}
