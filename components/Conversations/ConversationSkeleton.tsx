import { Skeleton } from "@nextui-org/react";
import React from "react";

export default function ConversationSkeleton() {
  return (
    <div className="w-full flex items-center justify-between gap-3 p-4">
      <div className="w-fit lg:w-full flex items-center gap-4 max-w-[300px]">
        <Skeleton className="flex rounded-full w-12 h-12" />
        <div className="hidden lg:flex flex-col flex-1 gap-2">
          <Skeleton className="h-3 w-1/2 rounded-lg" />
          <Skeleton className="h-3 w-2/3 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
