import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  Avatar,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface IUser {
  name: string;
  image: string;
}

export default function UserDropdown({ user }: { user: IUser }) {
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <div>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: user.image,
              }}
              className="transition-transform gap-3 font-semibold hidden lg:flex capitalize"
              name={user.name}
            />

            <Avatar
              isBordered
              as="button"
              className="transition-transform flex lg:hidden"
              src={user.image}
            />
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="user" className="h-14 gap-2">
            <p className="">
              Signed in as <span className="font-bold">{user.name}</span>
            </p>
          </DropdownItem>
          <DropdownItem key="profile">
            <Link href={"/profile"}>Profile</Link>
          </DropdownItem>
          <DropdownItem key="settings">Settings</DropdownItem>
          <DropdownItem
            onClick={async () => {
              await signOut();
            }}
            key="logout"
            color="danger"
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
