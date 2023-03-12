const { ethers, network } = require("hardhat");
const { verify } = require("../utils/verify");
const chainId = network.config.chainId;
module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("Deploying Contract......");
  const args = [];
  const BQtokenContract = await deploy("BQtoken", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  log("Contract Deployed!!!");

  if (chainId !== 31337 && process.env.ETHER_SCAN_API_KEY) {
    await verify(BQtokenContract.address, args);
  }
};

module.exports.tags = ["all", "token"];
