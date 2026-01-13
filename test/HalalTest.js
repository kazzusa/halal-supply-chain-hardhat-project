const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Halal Supply Chain Local Test", function () {
  it("Should deploy and set the correct JAKIM address", async function () {
    // 1. Get test accounts provided by Hardhat
    const [owner, otherAccount] = await ethers.getSigners();

    // 2. Load the contract factory (use the name INSIDE the .sol file)
    const HSC = await ethers.getContractFactory("HalalSupplyChain");

    // 3. Deploy the contract (pass the owner's address as the JAKIM constructor argument)
    const hsc = await HSC.deploy(owner.address);

    // 4. Test a value (assuming you have a 'jakim' public variable)
    // If your variable has a different name, change 'jakim' below
    const jakimAddress = await hsc.jakim(); 
    expect(jakimAddress).to.equal(owner.address);
    
    console.log("Local test passed! JAKIM is set to:", jakimAddress);
  });
});