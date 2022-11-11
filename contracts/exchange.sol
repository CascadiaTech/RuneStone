// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";


//// how does an order come in? poolid whihc is an asset pair 




/// @title A drip-feed system erc20 staking contract
/// @author The holloway brothers
/// @notice The user gets a certain amount of the contracts rewards supply distributed to them every block
/// based on their staked amount * RewardRate. The contract has to be loaded with funds to distribute
///
/// If the contract runs out of funds, it will return zero rewards for all users until more rewards are added.
/// If the contract runs out of rewards no one will be able to stake, or claim. They will be able to unstake though.
/// When they unstake, it will not update their time in the pool. So if the contract owner deposits funds
/// they may then claim their rewards pending BASED ON THEIR CURRENT BALANCE STILL STAKED at claim time
///
/// The contract will reflect 0 rewards when the total minted is below the reward supply
/// The contract only distributes the token provided in the constructor
contract StakingContract {

    struct RewardChange {
        uint256 time;
        uint256 cycleRate;
    }

    struct Poolinfo {
        uint256 id;
        address token1;
        address token2;
    }

    struct UserDepositInfo {
        uint256 poolid
        address token1
        address token2
        uint256 depositamount1
        uint256 depositamount2
    }
    mapping(uint256 => Poolinfo) public poolid;
    mapping(address => uint256) public TokensPoolId;
    mapping(address => UserDepositInfo) public UserInfo
    mapping(address => uint256) public PoolBaseToken; // returns 0, or 1 to mark if token1 or token2 ie base or ask. 
   //mapping(address => mapping(address => uint256)) public UsersDeposits;
    // this mapping is useraddress to token address - amount
    uint256 public lastpoolid;


initializePool(address token1input, address token2input, uint256 lastpoolid) private {
poolid[lastpoolid].token1 = token1input;
poolid[lastpoolid].token2 = token2input;
lastpoolid = lastpoolid + 1;

TokensPoolId[token1input] = lastpoolid  + 1;
TokensPoolId[token2input] = lastpoolid + 1;
PoolBaseToken(token1) = 0;
PoolBaseToken(token2) = 1;

}


getPoolIdbyToken(address token) public returns (uint256) {
    return TokensPoolId[token];
}

CheckifBaseTokenOrAskToken(address token) public returns (uint256) {
    return PoolBaseToken(token);
}

// now you have the pool id you can update the balance of the user in the pool

depoist( uint256 poolid, address, token, amount) {
    if(CheckifBaseTokenOrAskToken(token) == 0) {
    UserInfo[msg.sender][getPoolIdbyToken(token)][depositamount1].add(amount);

    }else{
    UserInfo[msg.sender][getPoolIdbyToken(token)][depositamount2].add(amount);

    }

}
