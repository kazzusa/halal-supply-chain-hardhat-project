const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("HalalModule", (m) => {
  const halalSupplyChain = m.contract("HalalSupplyChain", ["0x258e776Eb029bCF71C43eC1d5A935C1dff84cDdD"]);

  return { halalSupplyChain };
});