import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { type Session } from "next-auth";
import { getInitials } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import Link from "next/link";
import CoachingAvatarSignOutButton from "./CoachingAvatarSignOutButton";

const CoachingAvatar: React.FC<{ session: Session | null }> = ({ session }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={session?.user.image ?? ""} />
          <AvatarFallback className="bg-primary font-semibold text-secondary">
            {getInitials(session?.user.name ?? "")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-10">
        <DropdownMenuLabel>
          <p>Oskar Eriksson</p>
          <p className="text-xs text-muted-foreground">
            {session?.user.email ?? "Ingen e-postadress tillagd"}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuItem>
          <Link className="w-full" href={"/coaching/settings/account"}>
            Inställningar
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <CoachingAvatarSignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CoachingAvatar;
