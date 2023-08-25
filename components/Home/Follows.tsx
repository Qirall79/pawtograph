import { useSelector } from "react-redux";
import UserSkeleton from "../Global/UserSkeleton";
import { getUser } from "@/features/userSlice";
import { User as UserType } from "@prisma/client";
import Link from "next/link";
import { User } from "@nextui-org/react";

export default function Follows() {
  const user = useSelector(getUser);

  return (
    <div className="h-fit hidden lg:flex flex-col px-6 py-4 gap-5 bg-white rounded-xl">
      <h2 className="font-semibold">Follows</h2>
      {user.follows.length > 0 ? (
        user.follows.map((user: UserType) => {
          return (
            <Link
              className="flex flex-1 justify-between items-center"
              href={"/profile/" + user.id}
            >
              <User
                avatarProps={{
                  src: user.image || "",
                  size: "sm",
                }}
                className="transition-transform gap-3 font-semibold hidden lg:flex capitalize"
                name={user.name}
              />
            </Link>
          );
        })
      ) : (
        <p className="text-sm">You don't follow any pets yet</p>
      )}
    </div>
  );
}
