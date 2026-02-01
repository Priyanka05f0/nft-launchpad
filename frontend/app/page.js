'use client';

import { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";

// ✅ Your deployed Sepolia contract address
const CONTRACT_ADDRESS = "0xa275D6502924733026ed81d3bC9742c8E76b1B18";
const SEPOLIA_CHAIN_ID = "0xaa36a7"; // Hex for 11155111

// ✅ Human-Readable ABI
const ABI = [
  "function mint() external",
  "function tokenCounter() view returns (uint256)"
];

export default function Home() {
  const [account, setAccount] = useState(null);
  const [minted, setMinted] = useState(0);
  const [statusMsg, setStatusMsg] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  // 🔹 Step 1: Connect Wallet & Fix Network
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      setIsBusy(true);
      setStatusMsg("Connecting...");

      // Request accounts
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      
      // Force Switch to Sepolia if necessary
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (currentChainId !== SEPOLIA_CHAIN_ID) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: SEPOLIA_CHAIN_ID }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            setStatusMsg("Sepolia network not found in MetaMask. Please add it.");
          } else {
            throw switchError;
          }
        }
      }

      setAccount(accounts[0]);
      setStatusMsg("Connected to Sepolia ✅");
    } catch (err) {
      console.error("Connection Error:", err);
      setStatusMsg(err.message || "Connection failed. Please check MetaMask.");
    } finally {
      setIsBusy(false);
    }
  };

  // 🔹 Step 2: Load the current Mint Count
  const loadMintCount = useCallback(async () => {
    try {
      if (!window.ethereum || !account) return;

      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

      // Verify contract exists at address
      const code = await provider.getCode(CONTRACT_ADDRESS);
      if (code === "0x") {
        setStatusMsg("Error: Contract not found at this address on Sepolia.");
        return;
      }

      const count = await contract.tokenCounter();
      setMinted(Number(count));
    } catch (err) {
      console.error("Load count error:", err);
    }
  }, [account]);

  // 🔹 Step 3: Mint function
  const mintNFT = async () => {
    try {
      setIsBusy(true);
      setStatusMsg("Waiting for wallet approval...");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.mint();
      setStatusMsg("Transaction pending on-chain...");
      
      await tx.wait(); // Wait for 1 confirmation

      setStatusMsg("Minting successful! 🎉");
      loadMintCount(); // Update the number on screen
    } catch (err) {
      console.error("Mint Error:", err);
      setStatusMsg(err.reason || err.message || "Transaction failed.");
    } finally {
      setIsBusy(false);
    }
  };

  // Auto-refresh when account connects or changes
  useEffect(() => {
    if (account) {
      loadMintCount();
    }
  }, [account, loadMintCount]);

  return (
    <main style={{ 
      padding: "40px", 
      fontFamily: "monospace", 
      backgroundColor: "#121212", 
      color: "#00FF41", // Matrix Green
      minHeight: "100vh" 
    }}>
      <div style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center", border: "1px solid #00FF41", padding: "20px" }}>
        <h1>NFT_LAUNCHPAD_v1.0</h1>
        <hr style={{ borderColor: "#00FF41" }} />

        <p><b>NETWORK:</b> SEPOLIA TESTNET</p>
        <p><b>MINT_COUNT:</b> {minted} / 1000</p>

        <div style={{ margin: "30px 0" }}>
          {!account ? (
            <button 
              onClick={connectWallet}
              style={{ padding: "10px 20px", cursor: "pointer", background: "#00FF41", color: "black", border: "none" }}
            >
              CONNECT_WALLET
            </button>
          ) : (
            <div>
              <p style={{ fontSize: "12px" }}>ID: {account}</p>
              <button 
                onClick={mintNFT} 
                disabled={isBusy}
                style={{ 
                  padding: "15px 30px", 
                  fontSize: "20px", 
                  cursor: isBusy ? "wait" : "pointer", 
                  background: isBusy ? "#333" : "#00FF41", 
                  color: "black",
                  fontWeight: "bold",
                  border: "none"
                }}
              >
                {isBusy ? "PROCESSING..." : "MINT_NFT"}
              </button>
            </div>
          )}
        </div>

        {statusMsg && (
          <div style={{ marginTop: "20px", padding: "10px", border: "1px dashed #00FF41", fontSize: "14px" }}>
            {statusMsg}
          </div>
        )}
      </div>
    </main>
  );
}