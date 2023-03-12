const { run } = require("hardhat");

const verify = async (contractAddress, args) => {
  await run("verify:verify", {
    address: contractAddress,
    constructorArguments: args,
  });
};

module.exports = {
  verify,
};
