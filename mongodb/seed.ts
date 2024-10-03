import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import AccountUserModel from "./models/AccountUser";

import { connectDB } from ".";

dotenv.config({ path: process.argv[2] || ".env.local" });

async function dropCollections() {
  await AccountUserModel.collection.drop();
}

async function createAccountUsers() {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(process.env.DB_ADMIN_PASSWORD as string, salt);

  await AccountUserModel.create({ name: "admin", password: hash, admin: true });

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(
    process.env.DB_ACCOUNT_USER_PASSWORD as string,
    salt,
  );

  await AccountUserModel.create({ name: "user", password: hash, admin: false });
}

connectDB().then(async () => {
  await dropCollections();

  await createAccountUsers();

  process.exit();
});
