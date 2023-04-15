import { AiFillFileAdd } from "react-icons/ai";
import { BsFiles } from "react-icons/Bs";
import Table from "@/components/Table";
import Form from "@/components/Form";
import { useState } from "react";

function Dashboard() {

  const [active, setActive] = useState("table")

  return (
    <div className="h-screen w-screen bg-white flex">
      <div className="w-1/6 h-full bg-stone-900 flex flex-col items-start border-r-2 border-stone-600">
        <div className="mt-20 ml-10 m-5">
          <div className="text-white flex items-center cursor-pointer p-2 hover:bg-slate-300 hover:rounded-md hover:w-full hover:bg-opacity-25">
            <BsFiles className="fill-indigo-700 w-5 h-5" />
            <div className="pl-3 text-lg" onClick={() => setActive("table")}>Files</div>
          </div>
          <div className="text-white flex mt-8 items-center cursor-pointer hover:bg-slate-300 hover:rounded-md p-2 hover:w-full hover:bg-opacity-25">
            <AiFillFileAdd className="fill-indigo-700 w-5 h-5" />{" "}
            <div className="pl-3 text-lg" onClick={() => setActive("upload")}>Add Files</div>
          </div>
        </div>
      </div>
      <div className="w-full h-full bg-stone-800 flex flex-col">
      <div className="flex flex-col">
        <div className="w-full h-20 bg-stone-800 border-b-2 border-stone-600 relative flex items-center">
          <h1 className="text-white text-2xl absolute mr-auto ml-auto px-5 py-5 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Welcome Back
          </h1>
        </div>
        <div className="mr-5 ml-5 mt-5">
        {active === "table" && <Table/>}
        {active !== "table" && <Form />}
        </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
