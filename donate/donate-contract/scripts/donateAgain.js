const { ethers, getNamedAccounts } = require("hardhat");

const oneEth = ethers.utils.parseEther("2");

const donateAgain = async () => {
  console.log("paying");
  const user = (await getNamedAccounts()).user;
  const DonationContract = await ethers.getContract("Donate");
  const connectedContract = DonationContract.connect(user);
  const donatedTx = await connectedContract.payFee({
    value: oneEth,
  });
  await donatedTx.wait();

  console.log("payment successful");
};

donateAgain()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    process.exit(1);
  });
