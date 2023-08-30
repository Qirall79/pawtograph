import { Button, User, useDisclosure } from "@nextui-org/react";
import React from "react";
import UnfollowModal from "../Global/UnfollowModal";
import { RiUserUnfollowFill } from "react-icons/ri";

export default function Following({
  follow,
  unfollowUser,
}: {
  follow: { id: string; name: string; image: string };
  unfollowUser: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-full flex justify-between items-center">
      <User
        as="button"
        avatarProps={{
          src: follow.image || "",
          size: "lg",
        }}
        className="transition-transform gap-2 font-semibold capitalize"
        name={follow.name}
      />
      <Button
        color="danger"
        endContent={<RiUserUnfollowFill className="text-lg" />}
        onClick={onOpen}
        className="font-semibold"
      >
        Unfollow
      </Button>
      <UnfollowModal
        button="Unfollow"
        action={async () => {
          await unfollowUser(follow.id);
        }}
        isOpen={isOpen}
        message="Are you sure ?"
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
