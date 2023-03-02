const { assert, expect } = require("chai");
const { ethers, deployments } = require("hardhat");

describe("Donation Contract", () => {
  let accounts, deployer, DonationContract;
  beforeEach(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    await deployments.fixture("all");
    DonationContract = await ethers.getContract("Donate");
  });

  describe("pay Fee", () => {
    it("should allow a user pay successfully", async () => {
      const txPayFee = await DonationContract.payFee({
        value: ethers.utils.parseEther("1"),
      });
      expect(txPayFee).to.emit(DonationContract, "feeDonated");
    });

    it("should allow multiple Pay successfully", async () => {
      const playerIndex = 1;
      const donators = 5;
      for (let i = playerIndex; i < donators + playerIndex; i++) {
        const connectedContract = await DonationContract.connect(accounts[i]);

        await connectedContract.payFee({ value: ethers.utils.parseEther("1") });
      }
      const balance = await DonationContract.getBalance();
      console.log(balance.toString());
    });
  });

  describe("withdraw", () => {
    beforeEach(async () => {
      const playerIndex = 1;
      const donators = 5;
      for (let i = playerIndex; i < donators + playerIndex; i++) {
        const connectedContract = await DonationContract.connect(accounts[i]);

        await connectedContract.payFee({
          value: ethers.utils.parseEther("1"),
        });
      }
      const balance = await DonationContract.getBalance();
      console.log(`Starting Balance: ${balance.toString()}`);
    });
    it("owner should be able to withdraw", async () => {
      await DonationContract.withdrawFunds();
      const balance = await DonationContract.getBalance();
      console.log(`Ending Balance: ${balance.toString()}`);
      assert(balance == 0);
    });

    it("deny access to anybody that is not the owner", async () => {
      const randomDonator = accounts[6];
      const connectedContract = await DonationContract.connect(randomDonator);
      const tx = connectedContract.withdrawFunds();
      const balance = await DonationContract.getBalance();
      await expect(tx).to.be.revertedWith("Donate_notAccessToWithdraw");
    });
  });
});
