import { useEffect, useState } from "react";
import UserSkeleton from "../Global/UserSkeleton";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Chip, User } from "@nextui-org/react";
import Link from "next/link";
import { MdPets } from "react-icons/md";
import { IUser } from "@/types";
import { useSelector } from "react-redux";
import { getUser } from "@/features/userSlice";
import useSwr from "swr";

export default function Popular() {
  const [popularUsers, setPopularUsers] = useState<IUser[]>([]);
  const user = useSelector(getUser);
  const { data, isLoading, error } = useSwr(
    "/api/users/popular",
    (url) =>
      fetch(url, {
        cache: "no-cache",
      }).then((res) => res.json()),
    {
      refreshInterval: 10000,
    }
  );

  useEffect(() => {
    if (!isLoading) {
      setPopularUsers(data.users);
    }
  }, [user, isLoading, data]);

  if (error) {
    return (
      <div className="h-fit hidden lg:flex flex-col px-6 py-4 gap-5 bg-white rounded-xl">
        <h2 className="font-semibold">Popular pets</h2>
        <p>Something went wrong, {JSON.stringify(error)}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-fit hidden lg:flex flex-col px-6 py-4 gap-5 bg-white rounded-xl">
        <h2 className="font-semibold">Popular pets</h2>
        <UserSkeleton />
        <UserSkeleton />
        <UserSkeleton />
      </div>
    );
  }

  return (
    <div className="h-fit hidden lg:flex flex-col px-6 py-4 gap-5 bg-white rounded-xl">
      <h2 className="font-semibold">Popular pets</h2>
      {popularUsers.length > 0 ? (
        popularUsers.map((user) => {
          return (
            <Link
              key={user.id}
              className="flex flex-1 justify-between items-center"
              href={`/profile/${user.id}`}
            >
              <User
                avatarProps={{
                  src: user.image || "",
                  size: "sm",
                }}
                className="transition-transform gap-3 font-semibold hidden lg:flex capitalize"
                name={user.name}
              />

              <Chip
                size="sm"
                color="secondary"
                variant="flat"
                endContent={<MdPets />}
              >
                {user.followedBy!.length}
              </Chip>
            </Link>
          );
        })
      ) : (
        <p className="text-sm">There are no registered pets yet</p>
      )}
    </div>
  );
}
