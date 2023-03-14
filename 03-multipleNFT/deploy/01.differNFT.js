const { ethers, network } = require("hardhat");
const { verify } = require("../utils/verify");
const fs = require("fs");
const chainId = network.config.chainId;
const metadataTemplate = {
  name: "",
  description: "",
  image: "",
  atrributes: [
    {
      trait_type: "Base",
      value: "Starfish",
    },
  ],
};
module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("Deploying Contract......");
  const lowSVG = fs.readFileSync("./images/dynamicNFT/frown.svg", {
    encoding: "utf8",
  });
  const highSVG = fs.readFileSync("./images/dynamicNFT/happy.svg", {
    encoding: "utf8",
  });
  const args = [lowSVG, highSVG];
  const BasicNFTContract = await deploy("DifferNFT", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  log("Contract Deployed!!!");

  if (chainId !== 31337 && process.env.ETHER_SCAN_API_KEY) {
    await verify(BasicNFTContract.address, args);
  }
};

module.exports.tags = ["all", "DifferNFT"];
