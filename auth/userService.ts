import bcrypt from "bcryptjs";

import AccountUserModel from "@/mongodb/AccountUser";
import { connectDB } from "@/mongodb";

export const userService = {
  authenticate,
};

async function authenticate(
  username: string,
  password: string,
): Promise<{ id: string; name: string } | null> {
  await connectDB();
  const user = await AccountUserModel.findOne({
    name: username,
  }).select("+password");

  if (!user) return null;

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) return null;

  return { id: user._id, name: user.name };
}
