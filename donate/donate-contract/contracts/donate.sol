// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
//Pay and keep tract of donators
// a balance that keeps track of our balance
//only owner should be able to withdraw
error Donate_enterAFee(string);
error Donate_notAccessToWithdraw(string);
error Donate_withdrawalNotSuccessFul(string);
error Donate_lowContractBalance(string);
error Donate_InsufficientBalance(string);

contract Donate is ReentrancyGuard {
    address[] private donatorList;

    address private owner;
    uint private MINIMUM_VALUE = 1000;
    //mappings
    mapping(address => uint) public balanceOf;
    //Events
    event feeDonated(uint indexed amountDonated, address indexed donator);

    //modifiers
    modifier isOwner() {
        if (owner != msg.sender)
            revert Donate_notAccessToWithdraw("You are not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function payFee() public payable {
        if (msg.value <= MINIMUM_VALUE)
            revert Donate_enterAFee("Enter a value greater than zero");
        balanceOf[msg.sender] = address(msg.sender).balance;
        if (balanceOf[msg.sender] <= MINIMUM_VALUE)
            revert Donate_InsufficientBalance("Low Balance");
        donatorList.push(msg.sender);
        emit feeDonated(msg.value, msg.sender);
    }

    function withdrawFunds() public isOwner nonReentrant {
        uint balance = address(this).balance;
        if (balance <= 0) revert Donate_lowContractBalance("Low Balance");
        (bool success, ) = payable(msg.sender).call{value: balance}("");
        if (!success)
            revert Donate_withdrawalNotSuccessFul(
                "your withdrawal was not successful. try again"
            );
    }

    function getADonator(uint index) public view returns (address) {
        return donatorList[index];
    }

    function getDonatorList() public view returns (address[] memory) {
        return donatorList;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    receive() external payable {
        payFee();
    }

    fallback() external payable {
        payFee();
    }
}
