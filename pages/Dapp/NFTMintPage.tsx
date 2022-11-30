import "tailwindcss-elevation";
import { LoadingOutlined } from "@ant-design/icons";
import { useWeb3React } from "@web3-react/core";
import { Spin } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import styles from "../../styles/Home.module.css";
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
import Link from "next/link";
import MintCardComponent from "../../components/Cards/MintCard";
import ClaimComponent from "../../components/Claim/ClaimComponent";
import { formatEther } from "@ethersproject/units";
import { Contract } from "@ethersproject/contracts";
import { abiObject } from "../../contracts/tokenabi.mjs";
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
  const [price, setprice] = useState(String)
  const [balance, setbalance] = useState(10000000000)
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
        setbalance(100000000)
        const contractaddress = '0xc68A4C68F17fed266A5e39e7140650acAdfE78F8'// "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, provider)
        const balance = await new contract.balanceOf(account) //.claim(account,amount)
        const Claimtxid = await balance
        const finalbalance = Number(balance)
        //setbalance(100000000)
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
  },[account, balance]);


  if (!account)
  return (<>
  <HeaderComponent></HeaderComponent>
  <div className="w-full sm:px-4 md:px-20 lg:px-48 xl:px-64">
    <div className={'flex-col bg-gray-900 h-full font-medium border-gray-100 border-2 mx-auto px-6 mt-40 sm:px-6 md:px-12 lg:px-24 flex flex col justify-center content-center'}>
      <h5
      style={{ fontFamily: "Cinzel, serif" }}
      className="mb-2 text-center text-3xl font-bold tracking-tight self-center text-purple-100 dark:text-white">
      Please Connect your Wallet
      </h5>
      <div className={'self-center border-gray-800'}>
      <h5
      style={{ fontFamily: "Cinzel, serif" }}
      className="mb-2 text-center text-3xl font-bold tracking-tight self-center text-purple-100 dark:text-white">
      Make sure you have purchased $50 worth of RuneStone token, you can buy on the homepage
      </h5>
      </div> 
    </div>
  </div>
  </>)
  else if (balance * Number(price) == 0) return(<>
  <div className="w-full sm:px-4 md:px-20 lg:px-48 xl:px-64">
    <div className={'flex-col bg-gray-900 h-full font-medium border-gray-100 border-2 mx-auto px-6 mt-40 sm:px-6 md:px-12 lg:px-24 flex flex col justify-center content-center'}>
      <div className={'self-center border-gray-800'}>
      <h5
      style={{ fontFamily: "Cinzel, serif" }}
      className="mb-2 text-center text-3xl font-bold tracking-tight self-center text-purple-100 dark:text-white">
     You must purchase $50 worth of RuneStone token to accesss the mint page, you can buy on the homepage
      </h5>
      </div> 
    </div>
  </div></>)
  else
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <main className={styles.main}>
      <div className="flex flex-row w-screen">
      <Image
          className="relative min-w-full float-left elevation-10 z-index-0 md:clip-path-mypolygon"
          src={bloodred}
        ></Image>
        <div className="flex flex-col sm:content-start absolute z-index-10 justify-self-end justify-right align-right w-screen text-right">
          <h1 style={{ fontFamily: "Cinzel, serif" }} className="text-center text-5xl text-gray-100 mt-12 mr-5 md:text-5xl pr-5 text-right"> RuneStone </h1>
          <MintCardComponent></MintCardComponent>
        </div>

      </div>
      <div className="mt-96 sm:mt-96 md:mt-0 lg:mt-0 flex flex-col align-left z-index-40 text-right md:justify-left">
      </div>
      <ClaimComponent></ClaimComponent>
      </main>

      <FooterComponent></FooterComponent>
    </>
  );
};

export default NFTMint;
