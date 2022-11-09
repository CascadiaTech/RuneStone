import "tailwindcss-elevation";
import React, { useCallback, useEffect, useState } from "react";
import ScrollpositionAnimation from "../../hooks/OnScroll";
import Swal from "sweetalert2";
import { abiObject } from "../../contracts/abi.mjs";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  JsonRpcSigner,
  Web3Provider,
} from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { formatEther, parseEther } from "@ethersproject/units";
export default function MintCardComponent() {
  if (typeof window !== "undefined") {
    useEffect(() => {
      // Update the document title using the browser API
      ScrollpositionAnimation();
    }, [window.scrollY]);
  }
  const [loading, setLoading] = useState(false);
  const [totalSupply, settotalySupply] = useState(Number);
  const [pubmintprice, setpubmintprice] = useState(Number)
  const [pubmintactive, setpubmintactive] = useState(Boolean);
  const { account, chainId, active } = useWeb3React();
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
  const { library } = context;
  const [quantity, setquantity] = useState(Number);
  if (typeof window !== "undefined") {
    useEffect(() => {
      // Update the document title using the browser API
      ScrollpositionAnimation();
    }, [window.scrollY]);
  }

  useEffect(() => {
    async function FetchtotalSupply() {
      try {
        //setLoading(true)
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const NFTabi = abiObject;
        const contractaddress = "0xac046563E7104292fe9130b08360049F79A3B5BF";
        const contract = new Contract(contractaddress, NFTabi, provider);
        const Totalminted = await contract.totalSupply();
        const FinalResult = Number(Totalminted);
        const minted = FinalResult;
        settotalySupply(minted);
        return minted;
      } catch (error) {
        console.log(error);
      } finally {
      }
    }

    async function FetchPublicMintPrice() {
      try {
        //setLoading(true)
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const NFTabi = abiObject;
        const contractaddress = "0x178cB46bf6cc931AD7c9507c2347C197EAE1426F";
        const contract = new Contract(contractaddress, NFTabi, provider);
        const Mintprice = await contract.PUB_MINT_PRICE();
        const MintPriceformatted = formatEther(Mintprice);
        const FinalResult = Number(MintPriceformatted);
        const PublicMintPrice = FinalResult;
        setpubmintprice(PublicMintPrice);
        return PublicMintPrice;
      } catch (error) {
        console.log(error);
      } finally {
      }
    }

    async function FetchPublicMintActive() {
      try {
        //setLoading(true)
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const NFTabi = abiObject;
        const contractaddress = "0x178cB46bf6cc931AD7c9507c2347C197EAE1426F";
        const contract = new Contract(contractaddress, NFTabi, provider);
        const Mintactive = await contract.pubMintActive();
        setpubmintactive(Mintactive);
        return Mintactive;
      } catch (error) {
        console.log(error);
      } finally {
      }
    }

    FetchPublicMintPrice();
    FetchtotalSupply();
    FetchPublicMintActive();
  }, [pubmintprice, account, library?.provider, totalSupply]);
  const handleMint = useCallback(async () => {
    if (!account) {
      Swal.fire({
        icon: "error",
        title: "Connect Your Wallet To Mint",
      });
    }

    try {
      setLoading(true);
      const data = abiObject;
      const abi = data;
      const contractaddress = "0x178cB46bf6cc931AD7c9507c2347C197EAE1426F"; // "clienttokenaddress"
        const provider = new Web3Provider(library?.provider as ExternalProvider | JsonRpcFetchFunc)
        //const provider = getDefaultProvider()
        const signer = provider.getSigner()
        const contract = new Contract(contractaddress, abi, signer)
        const ethervalue = 0
        const etherstringvalue = JSON.stringify(ethervalue)
        const MintNFT = await contract.publicMint(1, { value: parseEther(etherstringvalue) }) //.claim()
        const signtransaction = await signer.signTransaction(MintNFT)
        const Claimtxid = await signtransaction
        Swal.fire({
          icon: "success",
          title: "Congratulations you have minted a RuneStone NFT",
          text: "Go View your item on Opensea",
        });
        return Claimtxid

    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [account, library?.provider, quantity]);

  //md:clip-path-clipsides border-t-4 border-b-4
  return (
    <div className="h-96 mt-56 relative justify-self-auto w-full md:absolute justify-self-end  pr-10 md:mt-80 z-index-50 content-start justify-start items-right mb-60 bg-transparent shadow-md hover:bg-white-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="flex flex-row items-right justify-end w-screen">
        <div className="invisible sm:invisible md:visible w-1/3 lg:visible justify-self-end content-end justify-right bg-white h-2 rounded-full w-1/2"></div>
      </div>
      <h5
        style={{ fontFamily: "Cinzel, serif" }}
        className="mt-12 text-2xl sm:text-3xl mb:mb-2 text-4xl font-bold text-right mr-12 tracking-tight text-gray-100 dark:text-white"
      >
        RuneStone NFT
      </h5>
      <button
        style={{ fontFamily: "Cinzel, serif" }}
        type="button"
        onClick={() => handleMint()}
        className="w-screen elevation-10 hover:elevation-50 md:w-96 h-24 clip-path-mycorners justify-self-start mt-10
        text-gray-100 bg-blue-700 transition ease-in-out duration-700 hover:scale-105 bg-blue-800 focus:ring-4
        focus:ring-blue-300 font-medium rounded-lg text-4xl px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
        focus:outline-none dark:focus:ring-blue-800 text-4xl"
      >
        Mint
      </button>
      <p className="sm:mr-16 mt-10 text-right font-normal text-white dark:text-gray-400">
        You can ony mint 1 NFT per wallet
      </p>
      <div className="flex flex-row items-right mt-10 justify-end w-screen">
        <div className="w-screen invisible sm:invisible md:visible w-1/2 lg:visible justify-self-end content-end justify-right bg-white h-2 rounded-full w-3/4 "></div>
      </div>
    </div>
  );
}
