import Image from "next/image";
import React, { useState } from "react";
import profile from "../../assets/images/profile.png";
import { SiBlockchaindotcom } from "react-icons/Si";
import { MdOutlineAudioFile } from "react-icons/Md";
import { RiVideoFill } from "react-icons/Ri";
import { BsImage } from "react-icons/Bs";
import { HiDocumentText } from "react-icons/Hi";
import Menu from "./Menu";
import MenuLogin from "./MenuLogin";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import axios from "axios";

const style = {
  container:
    "sticky top-0 z-10 bg-white w-screen backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200 firefox:bg-opacity-90",
  wrapper: "flex flex-1 items-center justify-around h-16",
  LeftContent: "pl-10 flex",
  Left: "flex justify-center align-center",
  RightContent: "flex flex-1 justify-center flex-auto",
  name: "mr-10 m-auto",
  link: "pl-5 flex",
  logo: "flex",
  profile: "cursor-pointer hover:opacity-75",
};


const Navbar = () => {
  const [display, setDisplay] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [userAddress, setUserAddress] = useState("");

  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();

  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    });

    const userData = { address: account, chain: chain.id, network: 'evm' };

    try {
      const { data } = await axios.post('api/auth/request-message', userData, {
        headers: {
          "content-type": "application/json",
        },
      });

      const message = data.message;

      console.log(userData);

      const signature = await signMessageAsync({ message });

      // redirect user after success authentication to '/user' page
      const { url } = await signIn('credentials', {
        message,
        signature,
        redirect: false,
        callbackUrl: '/Dashboard',
      });
      setAuthenticated(true)
      setUserAddress(userData.address)
      push(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className={style.container}>
      <div className={style.wrapper}>
        <div className={style.Left}>
          <div className={style.logo}>
            <SiBlockchaindotcom className="m-auto mr-2" /> NXT-SEARCH
          </div>
          <div className={style.LeftContent}>
            <a href="#" className={style.link}>
              <RiVideoFill className="m-auto mr-2" />
              Video
            </a>
            <a href="#" className={style.link}>
              <MdOutlineAudioFile className="m-auto mr-2" /> Audio
            </a>
            <a href="#" className={style.link}>
              <HiDocumentText className="m-auto mr-2" />
              Documents
            </a>
            <a href="#" className={style.link}>
              <BsImage className="m-auto mr-2" />
              Images
            </a>
          </div>
        </div>
        <div className="flex flex-col pr-24 items-center">
          <div className={style.RightContent}>
            <div className={style.name}>
            {userAddress ? `${userAddress.slice(0, 4)}....${userAddress.slice(-4)}` : ""}
            </div>
            <Image
              className={style.profile}
              src={profile}
              height={50}
              width={50}
              onClick={() => (display ? setDisplay(false) : setDisplay(true))}
            />
          </div>
          <div className="absolute z-10 mt-14 py-1 ml-6">
            {display &&
              (authenticated ? (
                <Menu />
              ) : (
                <div onClick={handleAuth}>
                  <MenuLogin className="text-center" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
