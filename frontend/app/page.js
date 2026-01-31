'use client';

import { useState } from 'react';

export default function Home() {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('MetaMask not installed');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      setAccount(accounts[0]);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Wallet connection failed');
    }
  };

  return (
    <main style={{ padding: '40px', color: 'white' }}>
      <h1>NFT Launchpad</h1>

      {account ? (
        <p>Connected wallet: {account}</p>
      ) : (
        <button onClick={connectWallet}>
          Connect Wallet
        </button>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </main>
  );
}
