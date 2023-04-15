import React, { useState, useEffect } from "react";
const FormData = require("form-data");
import axios from "axios";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { database } from "../firebase";
import { ref as dbref, set } from "firebase/database";

//dapp
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { dataChainAddress } from "../../config";
import UserData from "../../artifacts/contracts/Data.sol/UserData.json";

const Form = () => {
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fileType, setFileType] = useState("document");
  const [dataHash, setDataHash] = useState("");
  const [fileHash, setFileHash] = useState("");

  const ItemOnChain = async (dataHash, fileHash, name) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(dataChainAddress, UserData.abi, signer);
    const amount = { value: ethers.utils.parseEther("0.01") };
    let transaction = await contract.createToken(
      dataHash,
      fileHash,
      name,
      amount
    );
    await transaction.wait();
    console.log(transaction, "transaction is done!");
  };

  const formInput = {
    name: name,
    description: description,
    fileType: fileType,
  };

  const putData = (fileHash, dataHash) => {
    set(dbref(database, `contentdb/${v4()}`), {
      id: v4(),
      name: name,
      description: description,
      fileType: fileType,
      fileHash: fileHash,
      dataHash: dataHash,
      url: thumbnailUrl,
    });
  };

  const handleThumbnailChange = async (e) => {
    if (thumbnail) {
      const uniqueId = v4();
      const imageRef = ref(storage, `images/${uniqueId}`);
      uploadBytes(imageRef, thumbnail)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              setThumbnailUrl(url);
              return url;
            })
            .catch((err) => {
              console.log(err.message, "error getting image url");
            });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      console.log(e.target.files[0]);
    }
  };

  async function uploadToIPFS() {
    try {
      const fileData = new FormData();
      fileData.append("file", file);
      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: fileData,
        headers: {
          pinata_api_key: "cc271e1976cbfd7b5b8d",
          pinata_secret_api_key:
            "b11863d830f314c47e7101aeaef47d4fd0f33d7a83432debd4604104f91332c0",
          "Content-Type": "multipart/form-data",
          Accept: "text/plain",
        },
      });
      const fileHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
      setFileHash(fileHash);

      const data = JSON.stringify({
        pinataOptions: {
          cidVersion: 1,
        },
        pinataMetadata: {
          name: formInput.name,
          keyvalues: {
            name: formInput.name,
            description: formInput.description,
            fileType: formInput.fileType,
            file: fileHash,
          },
        },
        pinataContent: {
          name: formInput.name,
          keyvalues: {
            name: formInput.name,
            description: formInput.description,
            fileType: formInput.fileType,
            file: fileHash,
          },
        },
      });

      var config = {
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: "c86502bfd9ced7c6f400",
          pinata_secret_api_key:
            "65e87907abb3916960921e005f9b55ac92fb9ab6c1f3e9095c3d3643b08c1801",
        },
        data: data,
      };

      const res = await axios(config);
      const DataHash = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      setDataHash(DataHash);
      console.log(DataHash);
      putData(fileHash, DataHash);
      ItemOnChain(fileHash, DataHash, name);
      const obj = {
        name,
        description,
        fileType,
        fileHash,
        DataHash,
        thumbnailUrl,
      };
      console.log(obj);
    } catch (error) {
      console.log("Error sending File to IPFS: ");
      console.log(error);
    }
  }

  const uploadFunc = async () => {
    try {
      const url = handleThumbnailChange();
      console.log(url);
      uploadToIPFS();
    } catch (error) {
      console.log(error);
    }
  };

  const options = [
    { label: "Document", value: "document" },

    { label: "Video", value: "video" },

    { label: "Image", value: "image" },

    { label: "Audio", value: "audio" },
  ];

  const [value, setValue] = React.useState("fruit");

  return (
    <div>
      <div class="flex items-center justify-center w-full">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-700 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-600 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              class="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              PDF, VIDEO, AUDIO or IMAGE (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            accept="image/x-png,image/gif,image/jpeg"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
        </label>
      </div>
      <input
        class="block w-full mt-6 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        type="file"
        accept="application/pdf,video/mp4,video/x-m4v,video/*,image/png,image/gif,image/jpeg,.mp3,audio/*"
        onChange={handleFileChange}
      ></input>
      <div class="mb-6">
        <label
          for="default-input"
          class="block mb-2 text-lg mt-5 font-medium text-gray-200 dark:text-white"
        >
          Name of the File
        </label>
        <input
          type="text"
          id="default-input"
          class="bg-gray-50 border border-gray-300 text-gray-900 font-medium border-none rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div class="mb-6">
        <label
          for="default-input"
          class="block mb-2 text-lg mt-5 font-medium text-gray-200 dark:text-white"
        >
          Description
        </label>
        <input
          type="text"
          id="default-input"
          class="bg-gray-50 border border-gray-300 text-gray-900 font-medium border-none rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="h-10 rounded-md">
        <label>
          <select
            value={fileType.length > 0 ? fileType : "document"}
            onChange={(e) => setFileType(e.target.value)}
            className="w-full h-full rounded-md"
          >
            {options.map((option) => (
              <option value={option.value}>{option.value}</option>
            ))}
          </select>
        </label>
      </div>

      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-5"
        onClick={uploadFunc}
      >
        Upload Content
      </button>
    </div>
  );
};

export default Form;
