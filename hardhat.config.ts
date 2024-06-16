import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";
import 'solidity-coverage';
import "@nomiclabs/hardhat-solhint";

import "./tasks/add-claim.task";
import "./tasks/add-claim-1000.task"
import "./tasks/add-key.task";
import "./tasks/deploy-identity.task";
import "./tasks/deploy-proxy.task";
import "./tasks/remove-claim.task";
import "./tasks/remove-key.task";
import "./tasks/revoke.task";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
    { 
      version: "0.8.17",
    },
    {
      version: "0.8.20",
    }
  ],
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
  }, 
  networks: {
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com/v1/9cd3d6ce21f0a25bb8f33504a1820d616f700d24',
      accounts: ["1d79b7c95d2456a55f55a0e17f856412637fa6b3c332fa557ce2c8a89139ec74"],
    },
    localhost: {
      url: 'http://127.0.0.1:8545/',
      allowUnlimitedContractSize: true,
      gas: 2000000,
      gasPrice: 8000000000,
      blockGasLimit: 100000000429720 // whatever you want here
    },
    cdk: {
      url: 'http://35.214.93.241',
      accounts: ['bb6bd15999db0b658beeefbe176080e9a6f8f34de9e87e5ad2e2d6ff029b027e'],
    },
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/wgC_6RILBar_tWOU1IpbIxaRGZOb4JE6',
      accounts: ['7ac1dc4e135840843b7cee359ab21f3e117b53e6bf6c0dde8b2459f3199d3961']
    }

  }
};

export default config;
