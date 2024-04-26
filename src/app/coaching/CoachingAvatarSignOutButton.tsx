"use client";
import React from "react";
import { DropdownMenuItem } from "../_components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const CoachingAvatarSignOutButton = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
    });
    router.refresh();
  };
  return <DropdownMenuItem onClick={handleSignOut}>Logga ut</DropdownMenuItem>;
};

export default CoachingAvatarSignOutButton;
