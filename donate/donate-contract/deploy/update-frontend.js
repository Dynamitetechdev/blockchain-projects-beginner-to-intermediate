const { ethers, network } = require("hardhat");
const fs = require("fs");
const ABI_FILE = "../donate-frontend/my-app/constants/ABI.json";
const ADDRESSES_FILE =
  "../donate-frontend/my-app/constants/contractAddresses.json";

module.exports = async () => {
  console.log("Updating Frontend");
  if (process.env.UPDATE_FRONTEND) {
    await updateABI();
    await updateAddress();
  }
  console.log("Updated Frontend");
};
const updateABI = async () => {
  const donateContract = await ethers.getContract("Donate");
  fs.writeFileSync(
    ABI_FILE,
    donateContract.interface.format(ethers.utils.FormatTypes.json)
  );
};

const updateAddress = async () => {
  const donateContract = await ethers.getContract("Donate");
  const contractAddresses = JSON.parse(fs.readFileSync(ADDRESSES_FILE, "utf8"));

  const chainId = network.config.chainId;
  if (chainId in contractAddresses) {
    if (!contractAddresses[chainId].includes(donateContract.address)) {
      contractAddresses[chainId].push(donateContract.address);
    }
  } else {
    // we are create an key-Pair Value in our Contract Address file
    // the key is chainId: value is addresses
    contractAddresses[chainId] = [donateContract.address];
  }
  fs.writeFileSync(ADDRESSES_FILE, JSON.stringify(contractAddresses));
};

module.exports.tags = ["all", "frontend"];
