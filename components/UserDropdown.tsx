import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
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
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: user.image,
            }}
            className="transition-transform gap-4 font-medium"
            name={user.name}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="settings">
            <Link href={"/profile"}>Profile</Link>
          </DropdownItem>
          <DropdownItem key="team_settings">Settings</DropdownItem>
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
