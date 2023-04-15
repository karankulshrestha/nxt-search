import React from "react";
import Link from "next/link";

function MenuLogin() {
  return (
    <div className="w-300 h-30 bg-white z-20 absolute rounded-md">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="item-center h-11 px-5 pt-2 cursor-pointer hover:bg-sky-700 hover:rounded-md hover:text-white w-full h-full">
          Login
        </div>
      </div>
    </div>
  );
}

export default MenuLogin;
