import { Chip, User } from "@nextui-org/react";
import UserSkeleton from "../Global/UserSkeleton";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { MdPets } from "react-icons/md";
import { IUser } from "@/types";
import { useSelector } from "react-redux";
import { getUser } from "@/features/userSlice";
import useSwr from "swr";

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState<IUser[]>([]);
  const user = useSelector(getUser);

  const { data, isLoading, error } = useSwr(
    "/api/users/suggestions",
    (url) =>
      fetch(url, {
        cache: "no-cache",
      }).then((res) => res.json()),
    {
      refreshInterval: 60000,
    }
  );

  useEffect(() => {
    if (!isLoading) {
      setSuggestions(data.users);
    }
  }, [user, isLoading, data]);

  if (error) {
    return (
      <div className="h-fit hidden lg:flex flex-col px-6 py-4 gap-5 bg-white rounded-xl">
        <h2 className="font-semibold">Suggestions</h2>
        <p>Something went wrong, {JSON.stringify(error)}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-fit hidden lg:flex flex-col px-6 py-4 gap-5 bg-white rounded-xl">
        <h2 className="font-semibold">Suggestions</h2>
        <UserSkeleton />
        <UserSkeleton />
        <UserSkeleton />
        <UserSkeleton />
      </div>
    );
  }

  return (
    <div className="h-fit hidden lg:flex flex-col px-6 py-4 gap-5 bg-white rounded-xl">
      <h2 className="font-semibold">Suggestions</h2>
      {suggestions.length > 0 ? (
        suggestions.map((user) => {
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
                color="danger"
                variant="flat"
                endContent={<MdPets />}
              >
                {user.followedBy!.length}
              </Chip>
            </Link>
          );
        })
      ) : (
        <p className="text-sm">There are no suggestions for you right now</p>
      )}
    </div>
  );
}
