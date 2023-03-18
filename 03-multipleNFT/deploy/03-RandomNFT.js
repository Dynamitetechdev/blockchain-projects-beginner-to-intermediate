const { network, ethers } = require("hardhat");
const { networkConfig } = require("../helper-config");
const {
  storeImageToPinata,
  storeMetaData,
} = require("../utils/uploadTopinata");
const { verify } = require("../utils/verify");
const chainId = network.config.chainId;
console.log(chainId);

const nftMetaData = {
  name: "",
  description: "",
  image: "",
  attributes: [
    {
      trait_type: "Body",
      value: "bull Baby Type",
    },
  ],
  background_color: "000000",
};

module.exports = async ({ deployments, getNamedAccounts }) => {
  const nftImagesDirectory = "images/randomNft/";
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  let NFT_URI_arr;
  let vrfCoordinatorAddress, subId, MOCK_VRF;

  const handleNFTURI = async () => {
    NFT_URI_arr = [];
    const { PinataResponseArr, allNFTImages } = await storeImageToPinata(
      nftImagesDirectory
    );
    for (index in PinataResponseArr) {
      const nftMetaDataInfo = { ...nftMetaData };

      nftMetaDataInfo.name = allNFTImages[index].replace(".png", "");

      nftMetaDataInfo.description = `${nftMetaDataInfo.name} is a cool NFT dog`;
      nftMetaDataInfo.image = `ipfs.io/ipfs/${PinataResponseArr[index].IpfsHash}`;

      try {
        const { pinataMetaDataResponse } = await storeMetaData(nftMetaDataInfo);
        NFT_URI_arr.push(`ipfs.io/ipfs/${pinataMetaDataResponse.IpfsHash}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (process.env.UPLOAD_TO_PINATA == "true") {
    console.log("Uploading to Ipfs");
    await handleNFTURI();
    console.log("Uploading Done ✨✨");
  }

  if (chainId == 31337) {
    MOCK_VRF = await ethers.getContract("VRFCoordinatorV2Mock");
    const txResponse = await MOCK_VRF.createSubscription();
    const txReceipt = await txResponse.wait();
    subId = txReceipt.events[0].args.subId;
    vrfCoordinatorAddress = MOCK_VRF.address;
  } else {
    vrfCoordinatorAddress = networkConfig[chainId]["vrfAddress"];
    subId = networkConfig[chainId]["subId"];
  }

  console.log(NFT_URI_arr);
  const args = [
    vrfCoordinatorAddress,
    networkConfig[chainId]["keyHash"],
    subId,
    networkConfig[chainId]["callBackGasLimit"],
    NFT_URI_arr,
  ];
  const RandomNFTContract = await deploy("RandomNFT", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  console.log("Contract Deployed");

  if (chainId == 31337) {
    await MOCK_VRF.addConsumer(subId, MOCK_VRF.address);
  }

  if (chainId !== 31337 && process.env.ETHER_SCAN_API_KEY) {
    await verify(RandomNFTContract.address, args);
  }
};
module.exports.tags = ["all", "main", "random"];
