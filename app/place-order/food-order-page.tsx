"use client";

import { Suspense, use } from "react";
import { Card } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

import { PageRouting } from "./page";

import { getFood } from "@/actions/getFood";
import ImageCard from "@/components/image-card";

export interface FoodOrderPageProps {
  language: string;
}

type FoodPromise = Promise<
  {
    _id: string;
    name: string;
    image: string;
    translatedNames: {
      [key: string]: string;
    };
    isAvailable: boolean;
    availableNumber: number;
  }[]
>;

export default function FoodOrderPage({
  nextPage,
  language,
}: PageRouting & FoodOrderPageProps) {
  const food = getFood();

  return (
    <div className="flex flex-wrap gap-6">
      <Suspense fallback={<FoodSkeleton />}>
        <FoodDetails food={food} language={language} />
      </Suspense>
    </div>
  );
}

function FoodDetails({
  food,
  language,
}: {
  food: FoodPromise;
  language: string;
}) {
  const foodDetails = use(food);

  return (
    <>
      {foodDetails.map((food) => (
        <ImageCard
          key={food._id}
          alt={food.name}
          className="w-[calc(50%_-_0.75rem)] sm:w-[calc(100%_/_3_-_1rem)] lg:w-[calc(25%_-_1.125rem)] h-40 cursor-pointer hover:scale-110"
          src={food.image}
          onClick={() => {}}
        >
          <p className="text-medium text-white">
            {food.translatedNames[language]}
          </p>
        </ImageCard>
      ))}
    </>
  );
}

function FoodSkeleton() {
  return [...Array(16)].map((_, index) => (
    <Card
      key={index}
      className="border-2 w-[calc(50%_-_0.75rem)] sm:w-[calc(100%_/_3_-_1rem)] lg:w-[calc(25%_-_1.125rem)] h-40 cursor-pointer hover:scale-110"
      radius="lg"
    >
      <Skeleton className="border-white/20 border-1 overflow-hidden py-1.5 absolute before:rounded-xl rounded-large bottom-1.5 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 h-8" />
    </Card>
  ));
}
