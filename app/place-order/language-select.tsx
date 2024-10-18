"use client";

import { PageRouting } from "./page";

import ImageCard from "@/components/image-card";
import { languages } from "@/config/languages";

export default function LanguageSelectPage({ nextPage }: PageRouting) {
  return (
    <div className="flex flex-wrap gap-6">
      {languages.map((language) => (
        <ImageCard
          key={language.englishName}
          alt={language.englishName}
          className="w-[calc(50%_-_0.75rem)] sm:w-[calc(100%_/_3_-_1rem)] lg:w-[calc(25%_-_1.125rem)] h-40 cursor-pointer hover:scale-110"
          src={language.flag}
          onClick={() => nextPage({ langauge: language.englishName })}
        >
          <p className="text-medium text-white">{language.realName}</p>
        </ImageCard>
      ))}
    </div>
  );
}
