import { useEffect, useState } from 'react';
import { useWeb3React } from "@web3-react/core";

import { InjectedConnector } from '@web3-react/injected-connector'
import { Web3Provider } from "@ethersproject/providers";

export const ConnectWallet = () => {
  const injectedConnector = new InjectedConnector({supportedChainIds: [1,3, 4, 5, 42, ],})
  const { chainId, account, activate, active,library, deactivate } = useWeb3React<Web3Provider>()
  const onClick = () => {
    activate(injectedConnector)
  }
  const onActiveClick = () => {
    deactivate()
  }

  useEffect(() => {
    console.log(chainId, account, active)
    },);

  return (
    <div>
      {active ? (
                <button
                type="button"
                onClick={onActiveClick}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Disconnect Wallet
              </button>
      ) : (
        <button
        type="button"
        onClick={onClick}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Connect Wallet
      </button>
      )}
    </div>
  )
}