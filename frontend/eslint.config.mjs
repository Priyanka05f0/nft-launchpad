'use client';

import { useEffect, useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xA3694D198A85C056940c8c68dD89208e1D9F0CbF";

const ABI = [
  "function mint()",
  "function tokenCounter() view returns (uint256)"
];

export default function Home() {
  const [account, setAccount] = useState(null);
  const [minted, setMinted] = useState(0);
  const [txStatus, setTxStatus] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Install MetaMask");
      return;
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  };

  const loadMintCount = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      const count = await contract.tokenCounter();
      setMinted(Number(count));
    } catch (err) {
      console.error("Mint count error:", err);
    }
  };

  const mintNFT = async () => {
    try {
      setTxStatus("Transaction pending...");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.mint();
      await tx.wait();

      setTxStatus("Mint successful ✅");
      loadMintCount();
    } catch (err) {
      console.error(err);
      setTxStatus("Transaction failed ❌");
    }
  };

  useEffect(() => {
    if (account) loadMintCount();
  }, [account]);

  return (
    <main style={{ padding: "40px", color: "white" }}>
      <h1>NFT Launchpad</h1>

      <p><b>Sale Status:</b> Public Sale</p>
      <p><b>NFTs Minted:</b> {minted}</p>

      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Connected: {account}</p>
      )}

      <button onClick={mintNFT} disabled={!account}>
        Mint NFT
      </button>

      {txStatus && <p>{txStatus}</p>}
    </main>
  );
}
