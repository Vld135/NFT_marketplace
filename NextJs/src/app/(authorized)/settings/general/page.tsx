import ConnectMetamask from "@/components/Metamask/ConnectMetamask";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const fetchData = async () => {
  const res = await fetch("http://localhost:3000/api/settings", {
    headers: { Cookie: cookies().toString() },
  });

  if (res.status === 401) {
    redirect("/login");
  }

  return res.json();
};

export const revalidate = 3;
const General = async () => {
  const {
    user: { username, email, adress },
  } = await fetchData();

  return (
    <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
      <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>
      <div className="grid max-w-2xl mx-auto mt-8">
        <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
          <img
            className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Bordered avatar"
          />

          <div className="flex flex-col space-y-5 sm:ml-8">
            <button
              type="button"
              className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
            >
              Change picture
            </button>
            <button
              type="button"
              className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
            >
              Delete picture
            </button>
          </div>
        </div>

        <div className="items-center mt-8 sm:mt-14 text-[#202142]">
          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-indigo-900"
            >
              Your email
            </label>
            <input
              readOnly
              value={email}
              type="email"
              id="email"
              className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
              placeholder="your.email@mail.com"
              required
            />
          </div>
          <div className="mb-2 sm:mb-6">
            <label
              htmlFor="profession"
              className="block mb-2 text-sm font-medium text-indigo-900"
            >
              Username
            </label>
            <input
              readOnly
              value={username}
              type="text"
              id="profession"
              className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
              placeholder="username"
              required
            />
          </div>
          <div className="mb-2 sm:mb-6">
            <ConnectMetamask isConnected={adress} email={email} />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
