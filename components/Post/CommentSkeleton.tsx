import { Skeleton } from "@nextui-org/react";

export default function CommentSkeleton() {
  return (
    <div className="bg-slate-100 flex gap-2 items-center p-2  rounded-xl">
      <div className="max-w-[300px] w-1/3 flex items-center gap-3">
        <div>
          <Skeleton className="flex rounded-full w-12 h-12" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-2/5 rounded-lg" />
        </div>
      </div>
      <div className="w-full flex flex-1 flex-col gap-2">
        <Skeleton className="h-3 w-4/5 rounded-lg" />
        <Skeleton className="h-3 w-3/5 rounded-lg" />
      </div>
    </div>
  );
}
