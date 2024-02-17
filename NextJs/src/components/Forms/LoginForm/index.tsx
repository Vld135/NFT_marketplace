"use client"

import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";

const LoginForm = () => {
    return (
        <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={(e) => console.log(e)}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link href="/reset" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={(e) => console.log(e)}
                />
              </div>
            </div>

            <div>
              <Button
                type="button"
                onClick={() => console.log("Singin")}
               >
                Login
              </Button>
            </div>
          </form>
    );
} 

export default LoginForm;