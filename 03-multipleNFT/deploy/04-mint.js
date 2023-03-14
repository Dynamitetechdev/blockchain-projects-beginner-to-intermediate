const { ethers, network } = require("hardhat");
const chainId = network.config.chainId;
module.exports = async ({ getNamedAccounts }) => {
  //   const deployer = await getNamedAccounts();
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];

  //basic NFT
  const basicNFT = await ethers.getContract("BasicNFT", deployer);
  const basicNFTTX = await basicNFT.mint();
  await basicNFTTX.wait();
  // console.log(`Token URI for Basic NFT: ${await basicNFT.tokenURI(0)}`);

  //DifferNFT
  const DifferNFT = await ethers.getContract("DifferNFT", deployer);
  const tx = await DifferNFT.Mint(789);
  await tx.wait(1);

  const getTokenURI = await DifferNFT.lowSVGTOURI();
  console.log(getTokenURI);
  // await getTokenURI.wait(1);
};

module.exports.tags = ["all", "mint"];
