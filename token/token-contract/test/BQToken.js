const { expect, assert } = require("chai");
const { ethers, network, deployments } = require("hardhat");
const chainId = network.config.chainId;

chainId != 31337
  ? describe.skip
  : describe("BQToken", () => {
      let deployer, BQTokenContract, spender, account3;
      const ether = ethers.utils.parseEther("1");
      beforeEach(async () => {
        let accounts = await ethers.getSigners();
        deployer = accounts[0];
        spender = accounts[1];
        account3 = accounts[2];
        await deployments.fixture(["all"]);
        BQTokenContract = await ethers.getContract("BQtoken");
      });

      describe("Approve", () => {
        it("Should approve a spender some funds", async () => {
          const _spender = spender.address;
          const ApprovedFundTx = await BQTokenContract.approve(_spender, ether);
          const ApprovedFundReceipt = await ApprovedFundTx.wait(1);
          const { _value } = ApprovedFundReceipt.events[0].args;
          const allowanceOfSpender = await BQTokenContract.allowance(
            deployer.address,
            _spender
          );

          assert(allowanceOfSpender, ether);
          expect(ApprovedFundTx).to.emit(BQTokenContract, "Approval");
        });
      });

      describe("Transfer", () => {
        it("Should transfer and emit an event", async () => {
          const transferredFund = await BQTokenContract.transfer(
            spender.address,
            ether
          );
          await transferredFund.wait(1);
          expect(transferredFund).to.emit(BQTokenContract, "Transfer");
        });
      });

      describe("TransferFrom", () => {
        it("TransferFrom", async () => {
          const ApprovedFund = await BQTokenContract.approve(
            account3.address,
            ethers.utils.parseEther("10")
          );

          await ApprovedFund.wait(1);
          const startingAllowanceBalance = await BQTokenContract.allowance(
            deployer.address,
            account3.address
          );
          console.log("start allowance:" + startingAllowanceBalance.toString());

          const connectedToken = await BQTokenContract.connect(account3);

          // Connected with the spenders account
          const TransferFromTx = await connectedToken.transferFrom(
            deployer.address,
            account3.address,
            ethers.utils.parseEther("3")
          );

          await TransferFromTx.wait(1);

          const endingAllowanceBalance = await BQTokenContract.allowance(
            deployer.address,
            account3.address
          );
          console.log("End allowance:" + endingAllowanceBalance.toString());

          const remainAllowance = await BQTokenContract.allowance(
            deployer.address,
            account3.address
          );
          expect(remainAllowance).to.equal(ethers.utils.parseEther("7"));
        });
      });
    });
