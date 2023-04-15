import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
import axios from "axios";
import { exportToExcel } from "react-json-to-excel";

const fileName = "enquiries";
const exportType = "xls";

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    width: 350,
    editable: true,
  },
  {
    field: "fileType",
    headerName: "File Type",
    width: 150,
    editable: true,
  },
  {
    field: "hashIpfs",
    headerName: "Hash IPFS",
    width: 450,
    editable: true,
  },
];

export default function Table() {
  const [todoData, setTodoData] = useState([]);
  const formData = require("form-data");

  const [file, setFile] = useState();

  const handleIndexing = async () => {
    var myHeaders = new Headers();
    myHeaders.append("x-language", "fr");
    myHeaders.append(
      "X-STF-Serviceaccount",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6InNhIn0.eyJpc3MiOiJodHRwczovL251Y2xpYS5jbG91ZC8iLCJleHAiOjE3MTI1ODQ4NzIsImlhdCI6MTY4MDk2MjQ3NCwic3ViIjoiMTAzOGExN2UtYmEyZS00MDdhLWFlMGMtYzYxY2Q4MjIxMmEyIiwianRpIjoiN2I5YWQ0OGUtYmNlZi00MGUwLWI3ODktMDVhOTYwNjMwNzU3Iiwia2V5IjoiNWJhODNmYTUtYzRjNy00MzMxLWJmNDItMTQ3YzY1ZDljYmQ5Iiwia2lkIjoiMDFhNGFjNjktZTBhYy00YWM3LWE0NzQtMjBmYmZhNmUxYTEzIn0.TsRwQjCZI7tB6xmo0v80o0fbOYnHFxp69n19st7yF78FZg86kkobd5U2ToqIsZnzDb_5W6tptc4WCnVZ9rIj21VUZf5uwTT9FFvS0Uw0qaUmMbpvWvTwMyYYc2uvjcWTTEjBELHKfjlUtRtKriSObVi9ZR91LhtTHXFKGXsSrn2E5xP0Nuxl4ciiLrKv77_3PXvf9iJKv6wUZrUIKnvsxCjnF2mA_IpL96wvpASpnVbZL-uIW1ddCUSmBpljW9LTnnhzeTk39pQt1_U0_fFfGIsRKsKn5WNCU9C0rHMoodnb1EIqzaBX_bipLdsaXW9RoPmcs83rhLPqtTXYTMFZQX7ASCRySpxBQv65aXsn1s0zzis2ZQ4KgYXSG-6JOx7cT3IGMb4lTpmgXM3WbgcP8d42579rDaYatRU3oRyO-sxn-56o5GEjhmt3JQd4P7XWSpqUU7rtMcLLT8iLrfLbAVbjdMaE1rD2HTLfWCpJQo63YOlzDjMaXGyWkUmcOtd8329EKRcsYzNBK59Oncv6zK7-Uli1o6zFAJ8Mj0nEarnzMGfR56oHS97SyRsFHvBif_cVJ3NJ2S_jX97qNg2bQgSpKRAM3U4epD3xoqplwAWibAf1Zkv1OtNRdZ08mHAnkEYUXoUmVv7sK2Cf71HU9H4C9cRA5c2jrlkHG4cMX0Y"
    );
    var formdata = new FormData();
    formdata.append(
      "data",
      file,
      "/C:/Users/karan/Downloads/Innohacks-Team-Hawkeye.pdf"
    );

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://europe-1.nuclia.cloud/api/v1/kb/043233df-8f5c-443e-8935-4fbee6be7dd3/upload",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const handleClick = (e) => {
    setFile(e.target.files[0]);
  };

  const dataFetch = async () => {
    const dbRef = ref(database, "/contentdb");
    onValue(dbRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((inner) => {
        const data = {
          id: inner.child("id").val(),
          name: inner.child("name").val(),
          description: inner.child("description").val(),
          fileType: inner.child("fileType").val(),
          hashIpfs: inner.child("dataHash").val().slice(34, -1),
        };
        arr.push(data);
        console.log(data);
        setTodoData(arr);
      });
    });
  };

  useEffect(() => {
    dataFetch();
  }, []);

  const rows = todoData;

  console.log(todoData);

  return (
    <Box sx={{ height: 530, width: "100%" }}>
      <div className="flex">
        <div class="mb-3 w-96">
          <label
            for="formFile"
            class="mb-2 inline-block text-white dark:text-neutral-200"
          >
            Index File to Search
          </label>
          <input
            class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
            type="file"
            id="formFile"
            onChange={(e) => handleClick(e)}
          />
        </div>
        <Button
          variant="contained"
          className="h-10 top-7 ml-5 bg-sky-800"
          onClick={handleIndexing}
        >
          Index It
        </Button>
        <Button
          variant="contained"
          className="h-10 top-7 ml-5 bg-sky-800"
          onClick={() => exportToExcel(todoData, "File Details")}
        >
          Export Data
        </Button>
      </div>
      <DataGrid
        className="bg-white"
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
