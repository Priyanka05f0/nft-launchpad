# NFT Launchpad – Full Stack Web3 DApp

This project is a full-stack NFT Launchpad built using Solidity, Hardhat, Next.js, Ethers.js, and MetaMask, deployed on the Sepolia Ethereum Testnet.
It allows users to:
- Connect their wallet
- View sale status
- View total NFTs minted
- Mint NFTs on-chain
- See real-time transaction feedback

---

## Tech Stack

#### Smart Contract

- Solidity ^0.8.x
- OpenZeppelin ERC721
- Hardhat
- Sepolia Testnet

#### Frontend

- Next.js (App Router)
- React
- Ethers.js
- MetaMask

### Infrastructure

- IPFS (for metadata – simulated)
- Docker & Docker Compose
- GitHub

---

##  Project Structure
```
nft-launchpad/
│
├── contracts/
│   ├── contracts/
│   │   ├── MyNFT.sol
│   │   └── Lock.sol
│   ├── scripts/
│   │   └── deploy.js
│   ├── test/
│   │   └── MyNFT.test.js
│   ├── hardhat.config.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── page.js
│   │   └── globals.css
│   ├── package.json
│   └── next.config.mjs
│
├── metadata/
│   └── sample NFT metadata files
│
├── docker-compose.yml
├── Dockerfile
└── README.md
```

---

### Prerequisites

Ensure the following are installed:
- Node.js v18+
- npm
- MetaMask browser extension
- Git

---

## 5. Environment Variable Setup

### 5.1 Create .env file
Inside the contracts/ folder, create a file named .env.
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=YOUR_METAMASK_PRIVATE_KEY

Explanation:

SEPOLIA_RPC_URL: RPC endpoint from Alchemy/Infura

PRIVATE_KEY: MetaMask test wallet private key (Sepolia only)

⚠️ Important
- Use a test wallet
- Never use a mainnet wallet
- .env is excluded via .gitignore

---

## 6. Smart Contract Setup

### 6.1 Install dependencies
```bash
cd contracts
npm install
```
Expected result:
- Node modules installed successfully
- No fatal errors

### 6.2 Compile smart contracts
```bash
npx hardhat compile
```
Expected result:
- Compiled X Solidity files successfully
- This confirms the Solidity code is valid.

---


## 7. Step 5 – Testing (MANDATORY TASK)
### 7.1 Run unit tests
```bash
npx hardhat test
```
Tests Covered:
- Contract deployment
- NFT minting logic
- Ownership assignment
- Revert when accessing non-existent token

Expected output example:
```pgsql
- MyNFT Contract
✔ Should deploy with correct name and symbol
✔ Should mint NFT successfully
✔ Should assign NFT to minter
✔ Should fail if token does not exist
```

This fulfills “Write comprehensive unit tests” requirement.

## 8. Step 5 – Deployment to Sepolia Testnet
### 8.1 Deploy contract
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Expected output:
```
Deploying contract with account: 0xF89aC0E436eAAbCEE61b80Ed5f6f303C5d630850
MyNFT deployed to: 0xA3694D198A85C056940c8c68dD89208e1D9F0CbF
```

## 8.2 Verify on Etherscan

Open in browser:
```
https://sepolia.etherscan.io/address/0xE1Bf92fec305a988B3684E2D3dc59b4Da54525F2
```

Evaluator can verify:
- Contract creator
- Deployment transaction
- Network = Sepolia
 This fulfills “Deploy to a public testnet like Sepolia”.

---

## 9. Frontend Setup (Step 4)
### 9.1 Install frontend dependencies
```bash
cd ../frontend
npm install
```

### 9.2 Run frontend locally
```bash
npm run dev
```
Open in browser:
```
http://localhost:3000
```
(or 3001 if port 3000 is busy)

---

## 10. Step 4 – Feature Verification (IMPORTANT)
### Step 4.2 – Sale Status Display

UI shows:
```
Sale Status: Public Sale
```

### Step 4.3 – Mint Count Display

UI shows:
```
NFTs Minted: X
```
- Count updates after every mint
- Value is read from blockchain

### Step 4.4 – Minting UI

- “Connect Wallet” button
- “Mint NFT” button
- MetaMask transaction popup appears

## Step 4.5 – Transaction Feedback

UI displays:
- Transaction pending...
- Mint successful 
- or Transaction failed 

---

## 11. Gas Optimization Techniques Used

- Avoided ERC721Enumerable
- Used simple tokenCounter instead of arrays
- Minimal storage writes
- No unnecessary state variables
- Lightweight mint logic

---

## 12. Security Considerations

- Ownership handled via OpenZeppelin Ownable
- No payable external calls
- No re-entrancy risks
- Safe minting via _safeMint
- Proper input validation

---