import { Skeleton } from "@nextui-org/react";
import React from "react";

export default function UserInfoSkeleton() {
  return (
    <div className="max-w-[300px] max-h-[500px] w-full flex flex-col items-center gap-10">
      <Skeleton className="flex rounded-full w-[150px] h-[150px]" />
      <Skeleton className="h-4 w-40 rounded-lg" />
      <div className="flex gap-8">
        <Skeleton className="h-3 w-20 rounded-lg" />
        <Skeleton className="h-3 w-20 rounded-lg" />
      </div>
      <Skeleton className="h-6 w-32 rounded-lg" />
    </div>
  );
}
