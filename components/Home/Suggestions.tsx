import { Chip, User } from "@nextui-org/react";
import UserSkeleton from "../Global/UserSkeleton";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { MdPets } from "react-icons/md";
import { IUserWithCount } from "@/types";

export default function Suggestions() {
  const [suggestions, setSuggestions] = useState<IUserWithCount[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestions = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/users/suggestions");
      setSuggestions([...res.data.users]);
      setIsLoading(false);
    } catch (error: any) {
      toast.error("Something went wrong, " + error.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

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
                variant="bordered"
                className="gap-1"
                endContent={<MdPets />}
              >
                {user._count.followedBy}
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
