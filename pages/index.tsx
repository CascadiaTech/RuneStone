import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import HeaderComponent from "../components/Header/HeaderComponent";
import "tailwindcss-elevation";
import FooterComponent from "../components/Footer/FooterComponent";
import Link from "next/link";
import city from "../assets/images/city.jpeg";
import city3 from "../assets/images/city3.jpeg";
import DualCardComponent from "../components/DualCards/DualCardComponent";
import ScrollpositionAnimation from "../hooks/OnScroll";
import { useEffect, useState } from "react";
import AboutusComponent from "../components/Aboutus/AboutusComponent";
import Falls from "../assets/images/Falls.jpg";
import { SwapWidget,darkTheme, lightTheme, Theme } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider, ExternalProvider, JsonRpcFetchFunc } from "@ethersproject/providers";

const Home: NextPage = () => {
  //if (typeof window !== "undefined") {
  //  useEffect(() => {
  // Update the document title using the browser API
  //   ScrollpositionAnimation();
  // }, [window.scrollY]);
  /// }
  const { account } = useWeb3React();
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
  const { library } = context;
  const [uniswaprovider, setuniswapprivder] = useState();
  const Runeaddress = '0xc68a4c68f17fed266a5e39e7140650acadfe78f8'
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
  },[account]);

  const jsonRpcUrlMap = {
    1: ["https://mainnet.infura.io/v3/7724cb4383a249dfb4a847c90954b901"],
    3: ["https://ropsten.infura.io/v3/<YOUR_INFURA_PROJECT_ID>"],
  };

  useEffect(() => {
    async function ScrollpositionAnimation() {
      const targets = document.querySelectorAll(".js-show-on-scroll");
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          // Is the element in the viewport?
          if (entry.isIntersecting) {
            // Add the fadeIn class:
            entry.target.classList.add("motion-safe:animate-fadeIn");
          } else {
            // Otherwise remove the fadein class
            entry.target.classList.remove("motion-safe:animate-fadeIn");
          }
        });
      });
      // Loop through each of the target
      targets.forEach(function (target) {
        // Hide the element
        target.classList.add("opacity-0");

        // Add the element to the watcher
        observer.observe(target);
      });
      ScrollpositionAnimation();
    }
  });

  return (
    <div>
      <div className={styles.container}>
        <main className={styles.main}>
          <header>
            {" "}
            <HeaderComponent></HeaderComponent>
          </header>
          <div className=" flex flex-col bg-black object-center justify-center align-center h-auto w-screen">
            
            <Image className='justify-self-center justify-center align-center' width={1500} height={2500}  src={Falls}></Image>
            <div className="justify-center justify-self-center align-center z-index-50 md:justify-center justify-self-center align-center z-index-50 -translate-y-96">
              <h1> hello </h1>
            {uniswaprovider ? (
              <div className="flex flex-col w-screen bg:black p-10">
              <div className="justify-self-center justify-center align-center">
          <div className="Uniswap">
            <SwapWidget
              theme={darkTheme}
              jsonRpcUrlMap={jsonRpcUrlMap}
              provider={uniswaprovider}
              defaultOutputTokenAddress={Runeaddress}
            />
          </div>
          </div>
          </div>
        ) : (
          <></>
        )}
        </div>
          </div>
        </main>
      </div>
      <div className="mt-40 md:mt-20 lg:mt-0"></div>
      <FooterComponent></FooterComponent>
    </div>
  );
};

export default Home;
