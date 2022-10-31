import "tailwindcss-elevation";
import { LoadingOutlined } from "@ant-design/icons";
import { useWeb3React } from "@web3-react/core";
import { Spin } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterComponent from "../../components/Footer/FooterComponent";
import bloodred from "../../assets/images/bloodred.jpg";
import { Accordion } from "flowbite-react";
//import Rex_logo from '../../assets/images/REX_logo.png'
import { SwapWidget, darkTheme, lightTheme, Theme } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import {
  ExternalProvider,
  getDefaultProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
//const mySafeHTML = DOMPurify.sanitize(myHTML)

const NFTMint = () => {
  //const scrollY = useScrollPosition()
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [loading, setLoading] = useState(false);
  //const { account } = useActiveWeb3React()
  const { account } = useWeb3React();
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
  const { library } = context;
  const [uniswaprovider, setuniswapprivder] = useState();
  const Runeaddress = "0xc68a4c68f17fed266a5e39e7140650acadfe78f8";
  useEffect(() => {
    async function setProvider() {
      if (account) {
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        return provider;
      } else {
        return;
      }
    }
    setProvider().then((result) => setuniswapprivder(result as any));
  }, [account]);

  const jsonRpcUrlMap = {
    1: ["https://mainnet.infura.io/v3/7724cb4383a249dfb4a847c90954b901"],
    3: ["https://ropsten.infura.io/v3/<YOUR_INFURA_PROJECT_ID>"],
  };
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <div className="mt-20 bg:black"></div>
      <div className="flex flex-row bg:black ">
        <div className="w-3/4">
          <Image
            className="z-index-0 clip-path-mypolygon"
            src={bloodred}
          ></Image>
        </div>
        <div className="flex flex-col align-left z-index-40 text-right mt-96 md:justify-left">
          <div className="justify-left">
            <div
              style={{
                backdropFilter: "blur(30px)",
                backgroundColor: "hsla(0,0%,100%, 0.1)",
                height: "450px",
                width: "600px",
              }}
              className="z-index-50 -translate-x-100 -translate-y-10 clip-path-myoppositepolygon px-56 justify-right text-right items-right mb-60 bg-transparent rounded-lg border border-gray-200 shadow-md hover:bg-white-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5
                style={{ fontFamily: "Cinzel, serif" }}
                className="mb-2 text-2xl font-bold tracking-tight text-white-900 dark:text-white"
              >
                Mint a RuneStone NFT
              </h5>
              <button
                type="button"
                className="animate-pulse elevation-10 hover:elevation-50 w-48 h-24 clip-path-mycorners mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Mint
              </button>
              <p className="mt-10 font-normal text-white-700 dark:text-gray-400">
                You can ony mint 1 NFT per wallet address
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-screen bg-black justify-center align-center sm: mr-40">
        <div className="w-screen justify-center sm:bg-black flex flex-col text-center justify-center">
          <h1 className="font-serif justify-center text-center text-5xl">
            {" "}
            Claimable Tokens
          </h1>
          <Accordion alwaysOpen={true}>
            <Accordion.Panel>
              <Accordion.Title>
                Claim all, one one of your reflection tokens
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Flowbite is an open-source library of interactive components
                  built on top of Tailwind CSS including buttons, dropdowns,
                  modals, navbars, and more.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Check out this guide to learn how to{" "}
                  <a
                    href="https://flowbite.com/docs/getting-started/introduction/"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    get started
                  </a>{" "}
                  and start developing websites even faster with components on
                  top of Tailwind CSS.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                Is there a Figma file available?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Flowbite is first conceptualized and designed using the Figma
                  software so everything you see in the library has a design
                  equivalent in our Figma file.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Check out the{" "}
                  <a
                    href="https://flowbite.com/figma/"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Figma design system
                  </a>{" "}
                  based on the utility classes from Tailwind CSS and components
                  from Flowbite.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                What are the differences between Flowbite and Tailwind UI?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  The main difference is that the core components from Flowbite
                  are open source under the MIT license, whereas Tailwind UI is
                  a paid product. Another difference is that Flowbite relies on
                  smaller and standalone components, whereas Tailwind UI offers
                  sections of pages.
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  However, we actually recommend using both Flowbite, Flowbite
                  Pro, and even Tailwind UI as there is no technical reason
                  stopping you from using the best of two worlds.
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Learn more about these technologies:
                </p>
                <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                  <li>
                    <a
                      href="https://flowbite.com/pro/"
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Flowbite Pro
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tailwindui.com/"
                      rel="nofollow"
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Tailwind UI
                    </a>
                  </li>
                </ul>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
      </div>

      <FooterComponent></FooterComponent>
    </>
  );
};

export default NFTMint;
