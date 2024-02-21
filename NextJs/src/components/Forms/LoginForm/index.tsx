"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { ethers } from "ethers";
import { login } from "@/actions/(auth)/login";
import { useState } from "react";
import LoginByMetamask from "@/components/Metamask/LoginByMetamask";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    const resp: { error?: string } | undefined = await login(data);

    if (resp?.error) {
      setErrorMessage(resp.error);
    }
  };

  return (
    <form className="space-y-4" action={onSubmit}>
      <div className="text-center text-red-500">{errorMessage}</div>
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
          <div className="text-sm">
            <Link
              href="/reset"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </Link>
          </div>
        </div>
        <div className="mt-2">
          <Input id="password" name="password" type="password" required />
        </div>
      </div>

      <div>
        <Button type="submit">Login</Button>
      </div>
      <div>
        <LoginByMetamask />
      </div>
    </form>
  );
};

export default LoginForm;
