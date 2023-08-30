import { Button, User, useDisclosure } from "@nextui-org/react";
import React from "react";
import UnfollowModal from "../Global/UnfollowModal";
import { RiUserUnfollowFill } from "react-icons/ri";

export default function Follower({
  follower,
  deleteFollower,
}: {
  follower: { id: string; name: string; image: string };
  deleteFollower: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="w-full flex justify-between items-center">
      <User
        as="button"
        avatarProps={{
          src: follower.image || "",
          size: "lg",
        }}
        className="transition-transform gap-2 font-semibold capitalize"
        name={follower.name}
      />
      <Button
        color="danger"
        endContent={<RiUserUnfollowFill className="text-lg" />}
        onClick={onOpen}
        className="font-semibold"
      >
        Delete
      </Button>
      <UnfollowModal
        button="Delete"
        action={async () => {
          await deleteFollower(follower.id);
        }}
        isOpen={isOpen}
        message="Are you sure ?"
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
