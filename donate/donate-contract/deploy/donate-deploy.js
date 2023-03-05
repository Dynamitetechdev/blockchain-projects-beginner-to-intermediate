const { network } = require("hardhat");

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  const blockConfirmations = chainId == 31337 ? 1 : 6;

  log("----Deploying Contract----");
  const arguments = [];
  const DonationContract = await deploy("Donate", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: blockConfirmations,
  });
  log("----Contract Deployed----");
};

module.exports.tags = ["all", "donation"];
