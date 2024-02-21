"use client";

import { createAccount } from "@/actions/(auth)/registration";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";

const RegistrationForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      setErrorMessage("");
      const resp: { error?: string } | undefined = await createAccount(data);

      if (resp?.error) {
        setErrorMessage(resp.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="space-y-4" action={onSubmit}>
      <div>{errorMessage}</div>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Username
        </label>
        <div className="mt-2">
          <Input id="username" name="username" type="text" required />
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <Input id="email" name="email" type="email" required />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
        </div>
        <div className="mt-2">
          <Input id="password" name="password" type="password" required />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="ConfirmpPassword"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Confirm Password
          </label>
        </div>
        <div className="mt-2">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
          />
        </div>
      </div>

      <div>
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
};

export default RegistrationForm;
