const { ethers } = require("hardhat");

const oneEth = ethers.utils.parseEther("1");
const donate = async () => {
  console.log("paying");
  const DonationContract = await ethers.getContract("Donate");
  const donatedTx = await DonationContract.payFee({
    value: oneEth,
  });
  await donatedTx.wait(1);

  console.log("payment successful");
};

donate()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    process.exit(1);
  });
