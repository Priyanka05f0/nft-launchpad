const fs = require("fs");
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");

const addresses = JSON.parse(
  fs.readFileSync("./scripts/merkle/allowlist.json")
);

// Hash addresses
const leaves = addresses.map(addr => keccak256(addr.toLowerCase()));

// Create tree
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

// Root
const root = tree.getHexRoot();
console.log("Merkle Root:", root);

// Proof for first address (example)
const proof = tree.getHexProof(leaves[0]);
console.log("Proof for first address:", proof);
