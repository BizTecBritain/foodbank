"use server";

import { connectDB } from "@/mongodb";
import User from "@/mongodb/models/User";

export async function findUser(name: string) {
  await connectDB();

  const user = await User.find({ name: { equal: name } });

  return user != null;
}
