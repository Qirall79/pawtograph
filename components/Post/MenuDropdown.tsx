import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { CiMenuKebab } from "react-icons/ci";

export default function MenuDropdown({
  onOpen,
  isNotReply,
  setEditing,
}: {
  onOpen: any;
  isNotReply: any;
  setEditing?: any;
}) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="bg-transparent"
          isIconOnly
          startContent={<CiMenuKebab className="text-xl" />}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {isNotReply && (
          <DropdownItem onClick={() => setEditing(true)} key="edit">
            Edit
          </DropdownItem>
        )}
        <DropdownItem
          onPress={onOpen}
          key="delete"
          className="text-danger"
          color="danger"
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
