const networkConfig = {
  31337: {
    name: "goerli",
    vrfAddress: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
    aggregatorAddress: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    keyHash:
      "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
    subId: "9104",
    callBackGasLimit: 500000,
  },

  11155111: {
    name: "sepolia",
    vrfAddress: "0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625",
    keyHash:
      "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
    subId: 2,
    callBackGasLimit: 500000,
  },
};

module.exports = {
  networkConfig,
};
