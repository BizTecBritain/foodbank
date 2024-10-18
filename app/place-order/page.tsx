"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useDisclosure } from "@nextui-org/modal";

import LangaugeSelectPage from "./language-select";
import UserDetailsPage from "./user-details";
import FoodOrderPage from "./food-order-page";

import { logError } from "@/actions/logError";
import AskYesNo, { CustomComponentProps } from "@/components/ask-yes-no";

type Details = {
  langauge?: string;
  name?: string;
  adults?: number;
  children?: number;
};

const detailsSchema = z.object({
  langauge: z.string().optional(),
  name: z.string().optional(),
  adults: z.number().optional(),
  children: z.number().optional(),
});

function parseSearchParams(encryptedDetails: string | null) {
  if (!encryptedDetails) return {};

  try {
    const details = JSON.parse(atob(encryptedDetails));
    const result = detailsSchema.safeParse(details);

    if (result.success) return result.data;
  } catch (error) {
    logError((error as Error).message);
    localStorage.removeItem("details");
  }

  return {};
}

function detailsToPage(details: Details) {
  if (details.langauge) {
    if (
      details.name &&
      details.adults != undefined &&
      details.children != undefined
    ) {
      return 2;
    }

    return 1;
  }

  return 0;
}

export interface PageRouting {
  nextPage: (details: Details) => void;
}

export default function PlaceOrderPage() {
  const [details, setDetails] = useState<Details>({});
  const [page, setPage] = useState<number>(0);
  const disclosure = useDisclosure();

  useEffect(() => {
    const details = parseSearchParams(localStorage.getItem("details"));
    const page = detailsToPage(details);

    if (page != 0) {
      disclosure.onOpen();
    }
  }, []);

  function setBaseInfo(response: boolean) {
    if (response) {
      const details = parseSearchParams(localStorage.getItem("details"));
      const page = detailsToPage(details);

      setDetails(details);
      setPage(page);
    } else {
      localStorage.removeItem("details");
    }
  }

  function nextPage(newDetails: Details) {
    setPage((page) => page + 1);
    setDetails((oldDetails) => ({ ...oldDetails, ...newDetails }));

    localStorage.setItem(
      "details",
      btoa(JSON.stringify({ ...details, ...newDetails })),
    );
  }

  const pages = [
    <LangaugeSelectPage key="language" nextPage={nextPage} />,
    <UserDetailsPage key="user" nextPage={nextPage} />,
    <FoodOrderPage
      key="food"
      language={details.langauge || "English"}
      nextPage={nextPage}
    />,
  ];

  return (
    <>
      {pages[page]}
      <KeepProgressModal disclosure={disclosure} onSubmit={setBaseInfo} />
    </>
  );
}

function KeepProgressModal({ disclosure, onSubmit }: CustomComponentProps) {
  return (
    <AskYesNo
      disclosure={disclosure}
      title="Reload Session"
      onSubmit={onSubmit}
    >
      <p>
        It looks like you have refreshed the page without completing the form,
        would you like to continue where you left off?
      </p>
    </AskYesNo>
  );
}
