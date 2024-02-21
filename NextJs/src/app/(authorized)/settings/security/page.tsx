"use client";
import { useState } from "react";
import { changePassword } from "@/actions/(authorized)/changePassword";
import Input from "@/components/Input";

const Security = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const onSubmit = async (data: FormData) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    const resp: { error?: string } | undefined = await changePassword(data);

    if (resp?.error) {
      setErrorMsg(resp.error);
    } else {
      setSuccessMsg("Password has been changed successfully");
    }
  };

  return (
    <div className="items-center mt-8 sm:mt-14 text-[#202142]">
      {errorMsg && (
        <div className="text-red-500 text-sm font-medium">{errorMsg}</div>
      )}
      {successMsg && (
        <div className="text-green-500 text-sm font-medium">{successMsg}</div>
      )}
      <form className="space-y-4" action={onSubmit}>
        <div className="mb-2 sm:mb-6">
          <label
            htmlFor="currentPassword"
            className="block mb-2 text-sm font-medium text-indigo-900"
          >
            Current Password
          </label>
          <Input
            id="currentPassword"
            name="currentPassword"
            type="password"
            required
          />
        </div>
        <div className="mb-2 sm:mb-6">
          <label
            htmlFor="newPassword"
            className="block mb-2 text-sm font-medium text-indigo-900"
          >
            Password
          </label>
          <Input id="newPassword" name="newPassword" type="password" required />
        </div>
        <div className="mb-2 sm:mb-6">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-indigo-900"
          >
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Security;
