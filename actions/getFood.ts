"use server";

import { connectDB } from "@/mongodb";
import Food from "@/mongodb/models/Food";

export async function getFood() {
  await connectDB();

  const food = await Food.find({ foodType: "Food" });

  return food.map((food) => ({
    _id: food._id.toString(),
    name: food.name,
    image: food.image,
    translatedNames: food.translatedNames.toObject({ flattenMaps: true }),
    isAvailable: food.isAvailable,
    availableNumber: food.availableNumber,
  }));
}
