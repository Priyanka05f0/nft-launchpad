const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const MyNFT = await hre.ethers.getContractFactory("MyNFT");

  const nft = await MyNFT.deploy("ipfs://YOUR_CID_HERE/");

  // ✅ ethers v5
  await nft.deployed();

  console.log("MyNFT deployed to:", nft.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
