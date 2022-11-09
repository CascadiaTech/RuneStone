import styles from "../styles/Home.module.css";
import "tailwindcss-elevation";
import ScrollpositionAnimation from "../../hooks/OnScroll";
import { useEffect, useState } from "react";
import "@uniswap/widgets/fonts.css";
import { useWeb3React } from "@web3-react/core";
import { abiObject }  from '../../contracts/tokenabi.mjs'
import { Web3Provider, ExternalProvider, JsonRpcFetchFunc } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { formatEther } from "@ethersproject/units"
import Link from 'next/link'
import { ConnectWallet } from "../Web3Modal/WalletConnect";
import { Dropdown } from "flowbite-react";

export default function HeaderComponent() {
  const { account } = useWeb3React();
  const [loading, setLoading] = useState(false)
  const context = useWeb3React();
  const { library } = context;
  const [balance, setbalance] = useState(Number);
  const [price, setprice] = useState(String);
  const [uniswaprovider, setuniswapprivder] = useState();
  const Runeaddress = '0xc68a4c68f17fed266a5e39e7140650acadfe78f8';

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
        const prices = data.pairs
        const test = prices.forEach((item: any) => {
            setprice(String(item?.priceUsd))

        })
        await test
        console.log(price)
        return test
      } catch (error) {
        console.log(error)
        setLoading(false)
      } finally {
        setLoading(false)
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
        const signingprovider = new Web3Provider(library?.provider)
        const signer = signingprovider.getSigner()
        const contractaddress = '0xc68A4C68F17fed266A5e39e7140650acAdfE78F8'// "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, signer)
        const originalbalance = await new contract.balanceOf(account) //.claim(account,amount)
        const Claimtxid = await originalbalance
        const fixednumber = formatEther(Claimtxid)
        const balances = Number(originalbalance)
        const fuck = setbalance(1000000)
        await fuck
        console.log(balance)
  
        return balances
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

  return (
    <div>
      <nav className="bg-black px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="container flex flex-nowrap justify-left items-center mx-auto">
          <div></div>
          <div className="md:order-2">
            <ConnectWallet></ConnectWallet>
          </div>
          <div className="sm:visible md:hidden">
            <Dropdown label="Navigation">
              <Dropdown.Header>
                <span className="block text-sm">Navigation</span>
              </Dropdown.Header>
              <Dropdown.Item>
              <Link href="/">
                  <p
                    className="cursor-pointer block py-2 pr-4 pl-3 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Home{" "}
                  </p>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
              {balance * Number(price) >= 50 ? <><Link href="/Dapp/NFTMintPage">
                  <p className=" cursor-pointer block py-2 pr-4 pl-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                    Mint
                  </p>
                </Link></> : <> <Link href="#BuySection"><a>Buy Here</a></Link> </>}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
              <Link href="/ContactUs/ContactUsForm">
                  <p className=" cursor-pointer block py-2 pr-3 pl-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                    Contact Us
                  </p>
              </Link>
              </Dropdown.Item>
            </Dropdown>
          </div>
          <div
            className="h-0 justify-left items-left text-left w-full md:flex md:h-fit md:w-auto order-1"
            id="navbar-sticky"
          >
            <ul className="invisible md:visible h-auto flex flex-row justify-left text-left items-left p-4 mt-4 bg-black rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-black dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link href="/">
                  <p
                    className="cursor-pointer block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Home{" "}
                  </p>
                </Link>
              </li>
              <li>
              {balance * Number(price) >= 50 ? <><Link href="/Dapp/NFTMintPage">
                  <p className=" cursor-pointer block py-2 pr-4 pl-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                    Mint
                  </p>
                </Link></> : <> <Link href="#BuySection"><a>Buy Here</a></Link> </>}
              </li>
              <li>
                <Link href="/ContactUs/ContactUsForm">
                  <p className=" cursor-pointer block py-2 pr-3 pl-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                    Contact Us
                  </p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
//{CheckBalance > 50 ? MintPage : <></>}
