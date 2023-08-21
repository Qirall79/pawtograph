import { Skeleton } from "@nextui-org/react";
import React from "react";

export default function UserSkeleton() {
  return (
    <div className="max-w-[300px] w-full flex items-center gap-3">
      <Skeleton className="flex rounded-full w-12 h-12" />
      <Skeleton className="h-3 w-3/5 rounded-lg" />
    </div>
  );
}
