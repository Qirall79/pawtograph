import { Skeleton } from "@nextui-org/react";

export default function PostSkeleton() {
  return (
    <div className="bg-white p-6 space-y-4 rounded-xl">
      <div className="max-w-[300px] w-full flex items-center gap-3">
        <div>
          <Skeleton className="flex rounded-full w-12 h-12" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-2/5 rounded-lg" />
        </div>
      </div>
      <Skeleton className="w-3/5 rounded-lg">
        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
      </Skeleton>

      <Skeleton className="rounded-lg">
        <div className="h-36 rounded-lg bg-default-400"></div>
      </Skeleton>
      <div className="w-full flex gap-2">
        <Skeleton className="h-3 w-1/6 rounded-lg" />
        <Skeleton className="h-3 w-1/6 rounded-lg" />
      </div>
    </div>
  );
}
