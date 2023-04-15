import React from "react";
import { useRouter } from "next/router";

const style = {
  container: "w-full h-screen flex flex-col items-center justify-center",
  wrapper:
    "w-11/12 md:w-8/12 xl:w-1/2 h-auto p-5 rounded-3xl bg-white flex flex-col",
  input: "w-full h-full",
};

const SearchBar = () => {
  const router = useRouter();

  const handler = (e) => {
    router.push("/Result");
  }

  return (
    <div class="relative w-screen max-w-3xl">
      <form>
        <div class="flex w-full justify-between overflow-hidden rounded-md bg-white shadow shadow-black/20">
          <input
            type="text"
            class="block w-full flex-1 py-2 px-3 focus:outline-none"
            placeholder="Start Typing..."
            onKeyPress={handler}
          />
          <span class="m-1 inline-flex cursor-pointer items-center rounded-md bg-indigo-600 px-2 py-2 hover:bg-indigo-700">
            <svg class="text-white" width="32" height="32" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21.07 16.83L19 14.71a3.08 3.08 0 0 0-3.4-.57l-.9-.9a7 7 0 1 0-1.41 1.41l.89.89a3 3 0 0 0 .53 3.46l2.12 2.12a3 3 0 0 0 4.24 0a3 3 0 0 0 0-4.29Zm-8.48-4.24a5 5 0 1 1 0-7.08a5 5 0 0 1 0 7.08Zm7.07 7.07a1 1 0 0 1-1.42 0l-2.12-2.12a1 1 0 0 1 0-1.42a1 1 0 0 1 1.42 0l2.12 2.12a1 1 0 0 1 0 1.42Z"
              />
            </svg>
          </span>
        </div>
      </form>
      <div class="absolute mt-2 w-full overflow-hidden rounded-md bg-white">
        <div class="cursor-pointer py-2 px-3 hover:bg-slate-100">
          <p class="text-sm font-medium text-gray-600">Society</p>
          <p class="text-sm text-gray-500">Special Reports on the society...</p>
        </div>
        <div class="cursor-pointer py-2 px-3 hover:bg-slate-100">
          <p class="text-sm font-medium text-gray-600">Elon musk Affair</p>
          <p class="text-sm text-gray-500">
            Elon musk sleep restless night becoz doge crash..
          </p>
        </div>
        <div class="cursor-pointer py-2 px-3 hover:bg-slate-100">
          <p class="text-sm font-medium text-gray-600">
            Adani involved in banking
          </p>
          <p class="text-sm text-gray-500">
            Adani involved in heavy loan deals...
          </p>
        </div>
        <div class="cursor-pointer py-2 px-3 hover:bg-slate-100">
          <p class="text-sm font-medium text-gray-600">Google AI bard</p>
          <p class="text-sm text-gray-500">Source code of Bard is Leaked...</p>
        </div>
        <div class="cursor-pointer py-2 px-3 hover:bg-slate-100">
          <p class="text-sm font-medium text-gray-600">Genetics</p>
          <p class="text-sm text-gray-500">
            Latest Research from doctor Ashchiff...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
