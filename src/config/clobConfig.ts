import { ClobClient, Chain } from "@polymarket/clob-client";
import { ethers } from "ethers";

// Centralized configuration object
const polymarketConfig = {
  host: "http://localhost:8080", // Default host
  chainId: 137, // Default to Polygon Mainnet
  privateKey: "your_private_key_here", // Replace with actual private key
  apiKey: "your_api_key_here", // Replace with actual API key
  secret: "your_secret_here", // Replace with actual secret
  passphrase: "your_passphrase_here", // Replace with actual passphrase
};

// Initialize the signer using ethers.js
const signer = new ethers.Wallet(polymarketConfig.privateKey);

// Create API key credentials
const creds = {
  key: polymarketConfig.apiKey,
  secret: polymarketConfig.secret,
  passphrase: polymarketConfig.passphrase,
};

// Initialize the Polymarket CLOB client
const clobClient = new ClobClient(
  polymarketConfig.host, // API host
  polymarketConfig.chainId as Chain, // Chain ID
  signer, // ethers.js signer
  creds // API credentials
);

export default clobClient;
