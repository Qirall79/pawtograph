import { Skeleton } from "@nextui-org/react";
import UserSkeleton from "../Global/UserSkeleton";

export default function Suggestions() {
  return (
    <div className="h-fit hidden lg:flex flex-col px-6 py-4 gap-5 bg-white rounded-xl">
      <h2>Suggestions</h2>
      <UserSkeleton />
      <UserSkeleton />
      <UserSkeleton />
      <UserSkeleton />
      <UserSkeleton />
    </div>
  );
}
