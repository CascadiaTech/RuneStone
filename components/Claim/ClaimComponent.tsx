import "tailwindcss-elevation";
import { useWeb3React } from "@web3-react/core";
import Swal from "sweetalert2";
import { Accordion } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { abiObject } from "../../contracts/abi.mjs";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function ClaimComponent() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const { account } = useWeb3React();
  const showConnectAWallet = Boolean(!account);
  const context = useWeb3React();
  const [loading, setLoading] = useState(false);
  const [claim, setcanclaim] = useState(Boolean);
  const { library } = context;
  const [uniswaprovider, setuniswapprivder] = useState();

  const ClaimAll = useCallback(async () => {
    if (!account) {
      Swal.fire({
        icon: "error",
        title: "Connect Your Wallet To Mint, and Enter A Mint Quantity",
        timer: 5000,
      });
    }
    if (claim == false) {
      Swal.fire({
        icon: "error",
        title: "You cannot claim",
        timer: 5000,
      });
    }

    try {
      setLoading(true);
      const data = abiObject;
      const abi = data;
      const contractaddress = "0x94C031726851C62cE257Eb43942b40e808FbDf56"; // "clienttokenaddress"
      const provider = new Web3Provider(
        library?.provider as ExternalProvider | JsonRpcFetchFunc
      );
      //const provider = getDefaultProvider()
      const signer = provider.getSigner();
      const contract = new Contract(contractaddress, abi, signer);
      const ClaimTokens = await contract.ClaimAllTokens(); //.claim()
      const signtransaction = await signer.signTransaction(ClaimTokens);
      const Claimtxid = await signtransaction;
      Swal.fire({
        icon: "success",
        title: "Congratulations you have Claimed all of your rewards",
        text: "Go see them in your wallet, and stick around for the next drop",
      });
      return Claimtxid;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [account, library?.provider]);

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

    async function CanClaim() {
      if (!account) {
        console.log({
          message: "Hold On there Partner, there seems to be an Account err!",
        });
        return;
      }
      try {
        //setLoading(true)
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const abi = abiObject;
        const contractaddress = "0x94C031726851C62cE257Eb43942b40e808FbDf56";
        const contract = new Contract(contractaddress, abi, provider);
        //const FinalResult = await UserTokenBalance.toString()
        if (!account) {
          return Swal.fire({
            icon: "error",
            title: "Connect your wallet to claim",
            text: "you must connect your wallet to claim",
          });
        } else {
          const usersclaimperiod = await contract.usersPeriodId(account);
          const currentperiod = await contract.currentRewardPeriodId();
          (await usersclaimperiod) && await currentperiod;
          if (usersclaimperiod <= currentperiod) {
            setcanclaim(true);
          } else {
            setcanclaim(false);
          }
          return currentperiod;
        }
      } catch (error) {
        console.log(error);
      } finally {
        console.log(claim);
      }
    }
    CanClaim();
    setProvider().then((result) => setuniswapprivder(result as any));
  }, [account]);

  return (
    <>
      <div className="flex flex-col w-full md:px-20 lg:px-48 xl:px-64">
        <h5
          style={{ fontFamily: "Cinzel, serif" }}
          className="mb-2 text-3xl font-bold tracking-tight self-center text-purple-100 dark:text-white"
        >
          Claim Tokens
        </h5>
      </div>

      <div>
        {loading ? (
          <Spin indicator={antIcon} className="add-spinner" />
        ) : (
          <>
            <button
              style={{ fontFamily: "Cinzel, serif" }}
              type="button"
              onClick={() => ClaimAll()}
              className="w-full elevation-10 hover:elevation-50 md:w-96 h-24 clip-path-mycorners justify-self-start mt-10
            text-gray-100 bg-gray-400 transition ease-in-out duration-700 hover:bg-gray-800 hover:text-white focus:ring-4
            focus:ring-blue-300 font-medium rounded-lg text-3xl px-5 py-2.5 mb-6 dark:bg-blue-600 dark:hover:bg-blue-700 
            focus:outline-none dark:focus:ring-blue-800 text-4xl"
            >
              Claim
            </button>
          </>
        )}
      </div>

      <div>
      </div>
    </>
  );
}
