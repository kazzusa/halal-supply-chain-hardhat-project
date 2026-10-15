# Halal Supply Chain Tracker

A blockchain-powered halal supply chain application built with Hardhat, Solidity, and a simple web frontend. The project helps track chicken batches from farm to retail while ensuring each stage is recorded on-chain and validated by authorized parties such as the JAKIM authority.

## Overview

This project demonstrates a practical use case for blockchain in food traceability and halal compliance. Instead of relying on paper records or centralized documentation, each batch is recorded on the Ethereum blockchain with clear ownership, slaughter information, and certification status.

Users can:

- register participants such as farmers, slaughterhouses, distributors, and retailers
- create a batch at the farm level
- record slaughter details for each batch
- issue a halal certificate by an authorized JAKIM authority
- transfer ownership across the supply chain
- verify certificate validity and track the history of a product batch

## Key Features

- Role-based access control for supply chain actors
- Batch creation with product name and quantity
- Slaughter recording with method and shariah compliance status
- Halal certification issuance with expiry validation
- Ownership transfer tracking across the chain
- Public batch lookup for consumers and retailers
- Frontend dashboard for managing and verifying batches in a browser

## Smart Contract

The core logic lives in `contracts/HalalSupplyChain.sol`.

The contract supports the following roles and flows:

- Admin: registers participants
- Farmer: creates a batch
- Slaughterhouse: records slaughter details
- JAKIM: validates compliance and issues halal certificate
- Distributor and Retailer: transfer/verify ownership and product validity

Main contract functions include:

- `createBatch(...)`
- `recordSlaughter(...)`
- `issueHalalCertificate(...)`
- `transferOwnership(...)`
- `getBatchDetails(...)`
- `isCertificateValid(...)`

## Frontend

The application frontend is in the `frontend/` folder:

- `frontend/index.html` — dashboard and UI for each participant role
- `frontend/app.js` — Ethers.js integration with the smart contract and wallet actions

The UI allows users to connect a wallet with MetaMask, switch between role panels, and track supply chain events in real time.

## Project Structure

```text
.
├── contracts/
│   └── HalalSupplyChain.sol
├── frontend/
│   ├── app.js
│   └── index.html
├── ignition/
│   └── modules/
│       └── HalalSupplyChain.js
├── test/
│   └── HalalTest.js
├── hardhat.config.js
├── package.json
├── README.md
├── .gitignore
└── package-lock.json
```

## Tech Stack

- Solidity
- Hardhat
- JavaScript
- Ethers.js
- HTML/CSS frontend
- MetaMask wallet integration

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Compile the smart contract

```bash
npx hardhat compile
```

### 3. Run tests

```bash
npx hardhat test
```

### 4. Start a local Hardhat node

```bash
npx hardhat node
```

### 5. Deploy the contract

```bash
npx hardhat ignition deploy ./ignition/modules/HalalSupplyChain.js
```

## Example Workflow

1. Admin registers a wallet as a farmer, slaughterhouse, distributor, or retailer.
2. Farmer creates a new batch with a product name and chicken count.
3. Slaughterhouse records the slaughter method and checks whether it is shariah compliant.
4. JAKIM verifies the batch and issues a halal certificate.
5. Ownership can be transferred between actors as the product moves through the supply chain.
6. Retailers and consumers can track the batch and confirm whether the certificate is still valid.

## Notes

This repository is a prototype demonstrating blockchain-based halal traceability. It is useful as a learning project, proof-of-concept, or starting point for a more complete supply chain system with QR code integration, tokenized products, or off-chain document verification.

## License

This project is provided for educational and demonstration purposes.
