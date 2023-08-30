import { Skeleton } from "@nextui-org/react";
import React from "react";

export default function FollowSkeleton() {
  return (
    <div className=" w-full flex items-center justify-between gap-3">
      <div className="flex items-center gap-4 w-1/2 max-w-[300px]">
        <Skeleton className="flex rounded-full w-12 h-12" />
        <Skeleton className="h-3 w-1/2 rounded-lg" />
      </div>
      <Skeleton className="h-3 w-12 rounded-lg" />
    </div>
  );
}
