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
      const contractaddress = "0x99dd494b0edf70caf7c3e97d5e71cd7a6ecaff1c"; // "clienttokenaddress"
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
  }, [account, library?.provider, claim]);

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
        const contractaddress = "0x99dd494b0edf70caf7c3e97d5e71cd7a6ecaff1c";
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
          (await usersclaimperiod) && (await currentperiod);
          console.log(usersclaimperiod)
          console.log(currentperiod)
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
      <div className="flex flex-col w-full md:px-20 content-center items-center lg:px-48 xl:px-64">
        <h5
          style={{ fontFamily: "Cinzel, serif" }}
          className="mb-2 text-3xl font-bold tracking-tight self-center text-purple-100 dark:text-white"
        >
          Claim Tokens
        </h5>
        {loading ? (
          <Spin indicator={antIcon} className="add-spinner" />
        ) : (
          <>
          <div  className='flex flex-row bg:white w-full content-center items-center max-w-screen'>
            <button
              style={{ fontFamily: "Cinzel, serif" }}
              type="button"
              onClick={() => ClaimAll()}
              className="tn: mx-0 w-full mx-0 elevation-10 hover:elevation-50 sm: mx-24 md: mx-48 h-24 clip-path-mycorners justify-self-center mt-10
            text-gray-100 bg-gray-400 transition ease-in-out duration-700 hover:bg-gray-800 hover:text-white focus:ring-4
            focus:ring-blue-300 font-medium rounded-lg text-3xl px-5 py-2.5 mb-6 dark:bg-blue-600 dark:hover:bg-blue-700 
            focus:outline-none dark:focus:ring-blue-800 text-4xl lg: mx-48"
            >
              Claim
            </button>
            </div>
          </>
        )}
      </div>

      <div className='content-center max-w-screen'>


        <Accordion style={{ border: "transparent", maxWidth: '100vw'}} alwaysOpen={true}>
          <Accordion.Panel>
            <div
              className={
                "justify-center w-full mx-auto flex flex col h-full bg-black text-white hover:text-black hover:bg-black"
              }
            >
              <Accordion.Title
                className={"mx-auto flex flex col w-screen hover:text-black"}
                style={{
                  color: "#717171",
                  fontSize: "20px",
                  justifyContent: "center",
                }}
              >
                <p> Token of Fire!</p>
              </Accordion.Title>
            </div>
            <Accordion.Content>
              <div
                className={
                  "mx-auto sm:px-6 md:px-12 lg:px-24 flex flex col justify-between"
                }
              >
                <a  target="_blank" href="https://etherscan.io/address/0x90e2fa98dfc518317600dd3dc571de8d071a7238"
                  className="sm: text-sm mb-2 text-gray-100 hover:underline hover:text-blue-500 dark:text-blue-500 
      cursor-pointer dark:text-gray-400 sm:text-md md:text-lg lg:text-xl"
                >
                  Token Address: 0x90E2Fa98DfC518317600Dd3DC571DE8D071a7238
                </a>
              </div>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title
              className={"mx-auto flex flex col w-screen hover:text-black"}
              style={{
                color: "#717171",
                fontSize: "20px",
                justifyContent: "center",
              }}
            >
              <p> District 82!</p>
            </Accordion.Title>
            <Accordion.Content>
              <div
                className={
                  "mx-auto sm:px-6 md:px-12 lg:px-24 flex flex col justify-between"
                }
              >
                <a  target="_blank" href="https://etherscan.io/address/0xfc2c1edbc2715590667c7c4be0563010abc9e205"
                  className="sm: text-sm mb-2 text-gray-100 hover:underline hover:text-blue-500 dark:text-blue-500 
      cursor-pointer dark:text-gray-400 sm:text-md md:text-lg lg:text-xl"
                >
                  Token Address: 0xFC2C1EdBc2715590667c7c4BE0563010aBC9E205
                </a>
              </div>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </div>

      <div></div>
    </>
  );
}
