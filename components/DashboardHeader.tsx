import React from "react";
import UserAvatar from "./UserAvatar";
import { auth } from "@/auth";
import Logo from "./Logo";

export default async function DashboardHeader() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex justify-between p-6 border-b border-gray-200">
      <Logo />
      {user && <UserAvatar user={user} />}
    </div>
  );
}
