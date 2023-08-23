import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { CiMenuKebab } from "react-icons/ci";

export default function PostDropdown({ onOpen }: { onOpen: any }) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="bg-white"
          isIconOnly
          startContent={<CiMenuKebab className="text-xl" />}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="edit">Edit</DropdownItem>
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
