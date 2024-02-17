"use client"

import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";

const RegistrationForm = () => {
    return (
        <form className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  onChange={(e) => console.log(e)}
                />
              </div>
            </div>
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
              <div className="flex items-center justify-between">
                <label htmlFor="ConfirmpPassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <Input
                  id="ConfirmpPassword"
                  name="ConfirmpPassword"
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
                Create
              </Button>
            </div>
          </form>
    );
} 

export default RegistrationForm;