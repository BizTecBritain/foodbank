"use server";

import { connectDB } from "@/mongodb";
import User from "@/mongodb/models/User";

export async function createUser(
  name: string,
  language: string,
  adults: number,
  children: number,
) {
  await connectDB();
  const user = await User.create({
    name,
    language,
    familySize: { adults, children },
  });

  return user._id;
}
