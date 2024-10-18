"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useFormStatus } from "react-dom";

import { PageRouting } from "./page";

import { HandleInputChange, useInputs } from "@/hooks/useInputs";

type UserDetailsInput = {
  name: string;
  adults: number;
  children: number;
};

type NameFormProps = {
  inputs: UserDetailsInput;
  handleChange: HandleInputChange;
};

export default function UserDetailsPage({ nextPage }: PageRouting) {
  const [inputs, handleChange] = useInputs<UserDetailsInput>({
    name: "",
    adults: 0,
    children: 0,
  });

  const handleSubmit = async () => {
    nextPage(inputs);
  };

  return (
    <form
      action={handleSubmit}
      className="max-w-md mx-auto flex flex-col space-y-4"
    >
      <NameForm handleChange={handleChange} inputs={inputs} />
    </form>
  );
}

function NameForm({ inputs, handleChange }: NameFormProps) {
  const { pending } = useFormStatus();

  return (
    <>
      <div className="space-y-2">
        <Input
          isRequired
          required
          disabled={pending}
          label="Name"
          name="name"
          type="text"
          value={inputs.name || ""}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Input
          isRequired
          required
          disabled={pending}
          label="Number of adults"
          name="adults"
          type="number"
          value={String(inputs.adults) || ""}
          onChange={(e) => handleChange(e, "number")}
        />
      </div>
      <div className="space-y-2">
        <Input
          isRequired
          required
          disabled={pending}
          label="Number of children"
          name="children"
          type="number"
          value={String(inputs.children) || ""}
          onChange={(e) => handleChange(e, "number")}
        />
      </div>
      <div className="space-y-2">
        <Button className="max-w-xs" isLoading={pending} type="submit">
          Next
        </Button>
      </div>
    </>
  );
}
