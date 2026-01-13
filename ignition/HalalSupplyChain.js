const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("HalalModule", (m) => {
  // Pass your wallet address as the JAKIM address for the constructor
  const hsc = m.contract("HalalSupplyChain", ["0x959a8bd04Ef922171C36A1cC5c934187825da898"]);
  return { hsc };
});