require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20", // Ensure this matches your contract version
  networks: {
  sepolia: {
    url: process.env.SEPOLIA_RPC_URL,
    accounts: [process.env.PRIVATE_KEY],
    timeout: 60000, // Increase to 60 seconds
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY, // Needed for Requirement F (Verification)
  },
};