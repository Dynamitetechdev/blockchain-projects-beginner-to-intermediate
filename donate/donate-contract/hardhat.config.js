require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const RPC = process.env.GOERLI_RPC;
const PRIVATE_KEY1 = process.env.PRIVATE_KEY1;
const PRIVATE_KEY2 = process.env.PRIVATE_KEY2;
const privateKeys = [PRIVATE_KEY1, PRIVATE_KEY2];
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      chainId: 31337,
      blockConfirmations: 1,
    },
    goerli: {
      url: RPC,
      accounts: privateKeys,
      chainId: 5,
      blockConfirmations: 6,
    },
  },
  solidity: "0.8.17",

  namedAccounts: {
    deployer: {
      default: 0,
      5: 0,
    },
    user: {
      default: 1,
      5: 1,
    },
  },
  gasReporter: {
    enabled: false,
    noColors: true,
    outputFile: "gas-reporter.txt",
    currency: "USD",
    // coinmarketcap: "d4720ed6-4d46-4490-9a1c-c2b4539b3b5e",
    token: "ETH",
  },
  etherscan: {
    apiKey: {
      goerli: "VDPYH9I76NQNVCB1J68BGN5CV8BM7NPQSB",
    },
  },

  mocha: {
    timeout: 400000000, //200 sec
  },
};
