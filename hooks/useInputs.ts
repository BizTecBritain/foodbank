"use client";

import { ChangeEvent, useState } from "react";

export type Primitives = "string" | "number";

export type HandleInputChange = (
  event: ChangeEvent<HTMLInputElement>,
  type?: Primitives,
  validator?: (value: string) => boolean,
) => void;

export type HandleCheckboxChange = (
  event: ChangeEvent<HTMLInputElement>,
) => void;

export function useInputs<T extends { [key: string]: any }>(
  init: T,
): [T, HandleInputChange, HandleCheckboxChange] {
  const [inputs, setInputs] = useState<T>(init);

  const handleInputChange: HandleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: Primitives = "string",
    validator?: (value: string) => boolean,
  ) => {
    const { name, value } = event.target;

    if (validator && !validator(value)) return;

    if (type == "number")
      setInputs((values) => ({ ...values, [name]: Number(value) }));
    else setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleCheckboxChange: HandleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const name = event.target.name;
    const value = event.target.checked;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  return [inputs, handleInputChange, handleCheckboxChange];
}
