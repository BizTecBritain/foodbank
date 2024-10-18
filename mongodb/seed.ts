import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import AccountUserModel from "./models/AccountUser";
import Food from "./models/Food";

import { connectDB } from ".";

dotenv.config({ path: process.argv[2] || ".env.local" });

async function dropCollections() {
  await AccountUserModel.collection.drop();
  await Food.collection.drop();
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

async function createFood() {
  await Food.create({
    name: "Soup",
    image:
      "https://www.creamline.co.uk/storage/images/catalogue/heinz-cream-of-tomato-soup-400g.jpeg",
    foodType: "Food",
    translatedNames: { English: "Soup" },
    isAvailable: true,
    availableNumber: -1,
  });

  await Food.create({
    name: "Biscuits",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg",
    foodType: "Food",
    translatedNames: { English: "Biscuits" },
    isAvailable: true,
    availableNumber: 5,
  });

  await Food.create({
    name: "Pasta",
    image:
      "https://m.media-amazon.com/images/I/71h3XYQXxbS._AC_UF1000,1000_QL80_.jpg",
    foodType: "Food",
    translatedNames: { English: "Pasta" },
    isAvailable: true,
    availableNumber: -1,
  });

  await Food.create({
    name: "Nappies",
    image:
      "https://cdn.images.fecom-media.com/FE00042613/images/HE1877255_123456-GLS-CAM-P01.jpg",
    foodType: "Toiletries",
    translatedNames: { English: "Nappies" },
    isAvailable: true,
    availableNumber: -1,
  });
}

connectDB().then(async () => {
  await dropCollections();

  await createAccountUsers();
  await createFood();

  process.exit();
});
