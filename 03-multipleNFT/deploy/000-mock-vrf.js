module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  const BASE_FEE = "20000000000";
  const GAS_PRICE_LINK = 1e9;
  const args = [BASE_FEE, GAS_PRICE_LINK];
  if (chainId == 31337) {
    console.log("Deploying mock Contract");
    await deploy("VRFCoordinatorV2Mock", {
      from: deployer,
      log: true,
      args: args,
    });
    console.log("Mock Contract Deployed");
  }
};

module.exports.tags = ["all", "random", "mock"];
