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
import { Contract } from '@ethersproject/contracts'
import { abiObject }  from '../../contracts/abi.mjs'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export default function ClaimComponent() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
    const { account } = useWeb3React();
    const showConnectAWallet = Boolean(!account);
    const context = useWeb3React();
    const [loading, setLoading] = useState(false);
    const [claim, setcanclaim] = useState(Boolean)
    const { library } = context;
    const [uniswaprovider, setuniswapprivder] = useState();

    const ClaimAll = useCallback(async () => {
      if (!account) {
        Swal.fire({
          icon: "error",
          title: "Connect Your Wallet To Mint, and Enter A Mint Quantity",
          timer: 5000
        });
      }
      if (claim == false) {
        Swal.fire({
          icon: "error",
          title: "You cannot claim",
          timer: 5000
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
          const ClaimTokens = await contract.ClaimAllTokens()//.claim()
          const signtransaction = await signer.signTransaction(ClaimTokens)
          const Claimtxid = await signtransaction
          Swal.fire({
            icon: "success",
            title: "Congratulations you have Claimed all of your rewards",
            text: "Go see them in your wallet, and stick around for the next drop",
          });
          return Claimtxid
  
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
        console.log({ message: 'Hold On there Partner, there seems to be an Account err!' })
        return
      }
      try {
        //setLoading(true)
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const abi = abiObject
        const contractaddress = '0x178cB46bf6cc931AD7c9507c2347C197EAE1426F'
        const contract = new Contract(contractaddress, abi, provider)
        //const FinalResult = await UserTokenBalance.toString()
        if (!account) {
          return Swal.fire({
          icon: "error", 
          title: "Connect your wallet to claim",
          text: "you must connect your wallet to claim"})
        } else {
          const usersclaimperiod = await contract.usersPeriodId(account)
          const currentperiod = await contract.currentRewardPeriodId()
          await usersclaimperiod && currentperiod
          if(usersclaimperiod >= currentperiod){
            setcanclaim(true)
          }else{
            setcanclaim(false)
          }
          return currentperiod
        }
      } catch (error) {
        console.log(error)
      } finally {
        console.log(claim)
      }
    }
    CanClaim()
    setProvider().then((result) => setuniswapprivder(result as any));
  }, [account]);

  return (
<div className="w-full sm:px-4 md:px-20 lg:px-48 xl:px-64">
    <div className={'bg-gray-900 h-48 font-medium border-gray-100 border-2 mx-auto px-6 sm:px-6 md:px-12 lg:px-24 flex flex col justify-between'}>
      <h5
      style={{ fontFamily: "Cinzel, serif" }}
      className="mb-2 text-3xl font-bold tracking-tight self-center text-purple-100 dark:text-white">
      Claim Tokens</h5>
      <div className={'self-center border-gray-800'}>
      {loading ? <Spin indicator={antIcon} className="add-spinner" /> : <><button onClick={() => ClaimAll()} className="bg-gray-700 hover:bg-blue-700 text-gray-900 font-bold py-2 px-4 rounded-full">        <a
        className="text-blue-100 hover:underline dark:text-blue-500"
        >
        Claim
        </a>
        </button></>}
      </div> 
    </div>
  <div>
<Accordion style={{ border: 'transparent'}} alwaysOpen={true}>
<Accordion.Panel>
    <Accordion.Title className={' ' } style={{ color: '#717171', fontSize: '20px',
     justifyContent: 'center' }}>
    <p> Meow Meow Token!</p>
    </Accordion.Title>
  <Accordion.Content>
   <div className={'mx-auto md:px-12 lg:px-24 flex flex col justify-between'}>
      <p className="mb-2 mx-2 text-gray-100 hover:underline hover:text-blue-500 dark:text-blue-500 
      cursor-pointer dark:text-gray-400 sm:text-md md:text-lg lg:text-xl">
      Token Address: 0xC460f9E30FDdae51b45599b34F3514D5815eD1e0
      </p>
    </div>
  </Accordion.Content>
</Accordion.Panel>
<Accordion.Panel>
<div className={'justify-center w-full mx-auto flex flex col h-full bg-black text-white hover:text-black hover:bg-black'}>
    <Accordion.Title className={'mx-auto flex flex col w-screen hover:text-black' } style={{ color: '#717171', fontSize: '20px',
     justifyContent: 'center' }}>
    <p> FireBlade Token!</p>
    </Accordion.Title>
</div>
  <Accordion.Content>
  <div className={'mx-auto md:px-12 lg:px-24 flex flex col justify-between'}>
      <p className="mb-2 mx-2 text-gray-100 hover:underline hover:text-blue-500 dark:text-blue-500 
      cursor-pointer dark:text-gray-400 sm:text-md md:text-lg lg:text-xl">
      Token Address: 0xC460f9E30FDdae51b45599b34F3514D5815eD1e0
      </p>
  </div>
  </Accordion.Content>
</Accordion.Panel>
<Accordion.Panel>
    <Accordion.Title className={'mx-auto flex flex col w-screen hover:text-black' } style={{ color: '#717171', fontSize: '20px',
     justifyContent: 'center' }}>
    <p> Tsuki Inu!</p>
    </Accordion.Title>
  <Accordion.Content>
  <div className={'mx-auto md:px-12 lg:px-24 flex flex col justify-between'}>
      <p className="mb-2 mx-2 text-gray-100 hover:underline hover:text-blue-500 dark:text-blue-500 
      cursor-pointer dark:text-gray-400 sm:text-md md:text-lg lg:text-xl">
      Token Address: 0xC460f9E30FDdae51b45599b34F3514D5815eD1e0
      </p>
  </div>
  </Accordion.Content>
</Accordion.Panel>
</Accordion>
</div>
</div>
  )
}