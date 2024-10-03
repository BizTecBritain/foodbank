"use client";

import { signOut } from "next-auth/react";

import { AccountUser } from "@/mongodb/models/AccountUser";

type UserInfoProps = {
  user: AccountUser;
};

export default function UserInfo({ user }: UserInfoProps) {
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="rounded-lg border shadow-lg p-10">
      <div>Id : {user._id}</div>
      <div>Name : {user.name}</div>
      <div>Email : {user.admin ? "true" : "false"}</div>
      <button
        className="font-medium mt-2 text-blue-600 hover:underline"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
