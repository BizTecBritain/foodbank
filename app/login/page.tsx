"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Snippet } from "@nextui-org/snippet";
import { useFormStatus } from "react-dom";

type LoginInput = {
  username: string;
  password: string;
};

type PageProps = {
  searchParams: { error?: string };
};

export default function LoginPage({ searchParams }: PageProps) {
  const { pending } = useFormStatus();

  const [inputs, setInputs] = useState<LoginInput>({
    username: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await signIn("credentials", {
      username: inputs.username,
      password: inputs.password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <Card className="w-full max-w-md p-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-2">
          <h1 className="text-2xl font-medium">Login</h1>
          <small className="text-small text-left font-light opacity-80">
            Enter your email below to login to your account.
          </small>
        </CardHeader>
        <CardBody className="space-y-4">
          <form
            className="flex w-full py-3 flex-auto flex-col space-y-4"
            onSubmit={handleSubmit}
          >
            <div className="space-y-2">
              <Input
                required
                disabled={pending}
                id="username"
                label="Username"
                name="username"
                type="text"
                value={inputs.username || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Input
                required
                disabled={pending}
                id="password"
                label="Password"
                name="password"
                type="password"
                value={inputs.password || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Button className="w-full" disabled={pending} type="submit">
                Login
              </Button>
            </div>
          </form>
        </CardBody>
        {searchParams.error && (
          <CardFooter className="pt-0">
            <Snippet
              hideCopyButton
              hideSymbol
              className="w-full"
              color="danger"
              size="lg"
            >
              Login failed
            </Snippet>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
