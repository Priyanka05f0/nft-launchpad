const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT Contract", function () {
  let nft, owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const MyNFT = await ethers.getContractFactory("MyNFT");
    nft = await MyNFT.deploy("ipfs://test/");
    await nft.deployed();
  });

  it("Should deploy with correct name and symbol", async function () {
    expect(await nft.name()).to.equal("MyNFT");
    expect(await nft.symbol()).to.equal("MNFT");
  });

  it("Should mint NFT successfully", async function () {
    await nft.mint();
    const count = await nft.tokenCounter();

    // ✅ BigNumber comparison fixed
    expect(count.toString()).to.equal("1");
  });

  it("Should assign NFT to minter", async function () {
    await nft.mint();
    const ownerOfToken = await nft.ownerOf(0);
    expect(ownerOfToken).to.equal(owner.address);
  });

  it("Should fail if token does not exist", async function () {
    try {
      await nft.tokenURI(999);
      expect.fail("Expected revert but did not happen");
    } catch (error) {
      expect(error.message).to.include("Token does not exist");
    }
  });
});
