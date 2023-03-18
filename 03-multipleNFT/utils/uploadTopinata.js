const pinataSDK = require("@pinata/sdk");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const PINATA_APIKEY = process.env.PINATA_APIKEY;
const PINATA_SECRETKEY = process.env.PINATA_SECRETKEY;

const pinata = new pinataSDK({
  pinataApiKey: PINATA_APIKEY,
  pinataSecretApiKey: PINATA_SECRETKEY,
});
const PinataResponseArr = [];
const storeImageToPinata = async (nftImages) => {
  const imageDirectory = path.resolve(nftImages);

  const allNFTImages = fs.readdirSync(imageDirectory);

  for (index in allNFTImages) {
    const createdStreamedImages = fs.createReadStream(
      `${imageDirectory}/${allNFTImages[index]}`
    );
    const option = {
      pinataMetadata: {
        name: `randomNFT${index}:${allNFTImages[index]}`,
      },
    };

    try {
      const pinataResponse = await pinata.pinFileToIPFS(
        createdStreamedImages,
        option
      );
      PinataResponseArr.push(pinataResponse);
    } catch (error) {
      console.log(error);
    }
  }
  return { PinataResponseArr, allNFTImages };
};

const storeMetaData = async (nftMetaData) => {
  const option = {
    pinataMetadata: {
      name: nftMetaData.name,
    },
  };

  console.log("Uploading Metadata");
  try {
    const pinataMetaDataResponse = await pinata.pinJSONToIPFS(
      nftMetaData,
      option
    );
    return { pinataMetaDataResponse };
  } catch (error) {
    console.log(error);
  }

  console.log("Uploading Metadata Done✨");
};
module.exports = {
  storeImageToPinata,
  storeMetaData,
};
