const { run } = require("hardhat");

const verify = async (contractAddress, args) => {
  await run("verify:verify", {
    address: contractAddress,
    constructorArguments: args, //constructorArguments should always be the naming arguments for this
  });
};

module.exports = {
  verify,
};
