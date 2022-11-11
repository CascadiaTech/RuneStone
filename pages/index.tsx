import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import HeaderComponent from "../components/Header/HeaderComponent";
import "tailwindcss-elevation";
import FooterComponent from "../components/Footer/FooterComponent";
import DualCardComponent from "../components/DualCards/DualCardComponent";
import ScrollpositionAnimation from "../hooks/OnScroll";
import { useEffect, useState } from "react";
import AboutusComponent from "../components/Aboutus/AboutusComponent";
import Falls from "../assets/images/Falls.jpg";
import { SwapWidget,darkTheme, lightTheme, Theme } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import { useWeb3React } from "@web3-react/core";
import { abiObject }  from '../contracts/tokenabi.mjs'
import { Web3Provider, ExternalProvider, JsonRpcFetchFunc } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { BigNumber } from "@ethersproject/bignumber";
import { formatEther } from "@ethersproject/units"
import Link from "next/link";
import Swal from "sweetalert2";

const Home: NextPage = () => {
  const { account } = useWeb3React();
  const [loading, setLoading] = useState(false)
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
  const { library } = context;
  const [balance, setbalance] = useState(Number);
  const [price, setprice] = useState(String);
  const [uniswaprovider, setuniswapprivder] = useState();
  const Runeaddress = '0xc68a4c68f17fed266a5e39e7140650acadfe78f8'

  if (typeof window !== "undefined") {
    useEffect(() => {
      // Update the document title using the browser API
      ScrollpositionAnimation();
    }, [window.scrollY]);
  }

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
    async function FetchPrice() {
      try {
        setLoading(true)
        const response = await fetch(
          'https://api.dexscreener.com/latest/dex/tokens/0xc68A4C68F17fed266A5e39e7140650acAdfE78F8'
        ) // Api Key also the pair contract

        const data = await response.json()
        const price = data.pairs
        const test = price.forEach((item: any) => {
          setprice(String(item?.priceUsd))
        })
        await test
        return
      } catch (error) {
        console.log(error)
        setLoading(false)
      } finally {
        setLoading(false)
        console.log(price)
      }
    }
    async function balanceOf() {
      if (!account) {
        console.log({ message: 'Hold On there Partner, there seems to be an Account err!' })
        return
      }
  
      try {
        setLoading(true)
        const abi = abiObject
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const contractaddress = '0xc68A4C68F17fed266A5e39e7140650acAdfE78F8'// "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, provider)
        const balance = await new contract.balanceOf(account) //.claim(account,amount)
        const Claimtxid = await balance
        const fixednumber = formatEther(balance)
        const finalbalance = Number(balance)
        setbalance(finalbalance)
        console.log(finalbalance)
  
        return Claimtxid
        /////
      } catch (error) {
        console.log(error)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }
  
    balanceOf()
    FetchPrice()
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
            entry.target.classList.add("motion-safe:animate-fadeInLeft");
          } else {
            // Otherwise remove the fadein class
            entry.target.classList.remove("motion-safe:animate-fadeInLeft");
          }
        });
      });
      // Loop through each of the target
      targets.forEach(function (target) {
        // Hide the element
        target.classList.add("transform-0");

        // Add the element to the watcher
        observer.observe(target);
      });
      ScrollpositionAnimation();
    }
  });

  return (
    <div className="bg-black">
       <header>
            {" "}
            <HeaderComponent></HeaderComponent>
       </header>
        <div className={'flex flex row mx auto'}>
          <p className={''}></p>
        <div className={'mx-auto self-center tn:translate-y-20 sm:z-10 sm:absolute sm:-translate-y-24 md:-translate-y-0 md:relative lg:-translate-y-44 xl:-translate-y-32'}>
            <h5
             style={{ fontFamily: "Cinzel, serif" }}
             className="text-4xl sm:text-4xl text-4xl text-center font-bold tracking-tight text-gray-100 md:text-4xl lg:text-5xl dark:text-white"
             >
             RuneStone NFT
             </h5>
             <p className={'my-20'}></p>
            <div className={'flex flex col object-left justify-start'}> 
             <button type="button" className="text-gray-100 hover:text-black border border-gray-200 hover:bg-gray-100 
             focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-lg px-8 py-4 text-center mr-2 mb-2">
              <a href="https://runestonetoken.com/">Website</a>
             </button>
             <button type="button" className="text-gray-100 hover:text-black border border-gray-200 hover:bg-gray-100 
             focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-lg px-8 py-4 text-center mr-2 mb-2">
              <a href="opensea.io">OpenSea</a>
             </button>
             <button type="button" className="text-gray-100 hover:text-black border border-gray-200 hover:bg-gray-100 
             focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-lg px-8 py-4 text-center mr-2 mb-2">
                           {balance * Number(price) >= 50 ? <><Link href="/Dapp/NFTMintPage">
                  <p className=" cursor-pointer block py-2 pr-4 pl-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                    Mint
                  </p>
                </Link></> : <> <Link href="#BuySection"><a onClick={() => Swal.fire({icon: 'warning', title: "you must connect your wallet to mint", text: "if you do not have rune token you cannot access the mint page, purchase on our Uniswap widget after connecting your wallet"})}>Mint</a></Link> </>}
             </button>
            </div> 
         </div>
            
         <div className={'flex flex col'}>
          <div className="flex flex-row justify-end">
           <div className={'w-120% h-120%'}>
            <Image style={{ paddingBottom: '25%' }} className='float-right clip-path-clipcorners self-end place-content-end
            justify-right align-right sm:z-0 sm:relative md:absolute' src={Falls}></Image>
          </div>
         </div>
         </div>
     </div>

        <main id="BuySection">
            <p className={' mt-44 mb-44 py-16'}></p>
            <div className="flex flex-col z-index-50 -translate-y-96 sm:flex-col md:flex-row lg:flex-row">
            <div className={'self-center'}>
            <div
              className={'justify-center px-6 text-center mt-10 mb-10 mx auto md:mt-0 md:mb-0 md:mr-6 lg:mr-14'}>
              <h4 className={' font-bold tracking-tight text-white text-4xl sm:text-3xl text-white md:text-3xl lg:text-4xl'}
              style={{ fontFamily: "Cinzel, serif" }}>
              You must purchase $50 USD of RuneStone Token before accessing the
              mint page, Buy some here!
              </h4>
              <h4 className={' font-bold tracking-tight text-white text-2xl sm:text-3xl text-white md:text-3xl lg:text-4xl'}
              style={{ fontFamily: "Cinzel, serif" }}>
                Connect your wallet to purchase
              </h4>
            </div>
          </div>
            {uniswaprovider ? (
          <>
        <div className={''}>
          <div className="Uniswap mx-auto px-6 sm:px-6 md:px-12 lg:px-24">
              <SwapWidget
                theme={darkTheme}
                width={'100%'}
                jsonRpcUrlMap={jsonRpcUrlMap}
                provider={uniswaprovider}
                defaultOutputTokenAddress={Runeaddress} />
            </div>
        </div>
          </>
        ) : (
          <></>
        )}
        </div>
        </main>
      <div className="mt-20 md:mt-20 lg:mt-0"></div>
      <FooterComponent></FooterComponent>
    </div>
  );
};

export default Home;
//style={{ boxShadow: '0px 0px 3px 2px rgba(255, 255, 255, 0.6)' }} 
