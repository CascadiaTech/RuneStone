//import 'tw-elements'
import "tailwindcss-elevation";
//import { Stickynavbar } from 'flowbite-react'

//const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
import React from "react";
//import Image from "next/image";
import Link from "next/link";
import { ConnectWallet } from "../Web3Modal/WalletConnect";
import { Dropdown } from "flowbite-react";
export default function HeaderComponent() {
  //    backgroundImage: `url(${backgroundimage})`,

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
              <Link href="/Dapp/NFTMintPage">
                  <p className=" cursor-pointer block py-2 pr-4 pl-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                    Mint
                  </p>
                </Link>
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
                <Link href="/Dapp/NFTMintPage">
                  <p className=" cursor-pointer block py-2 pr-4 pl-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                    Mint
                  </p>
                </Link>
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
