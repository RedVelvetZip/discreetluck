import { ClobClient } from "@polymarket/clob-client";
import { SignatureType } from "@polymarket/order-utils";
import { ethers } from "ethers";

// ==============================
// Config Constants
export const POLYGON_RPC_URL = "https://polygon-rpc.com";
export const CLOB_API_URL = "https://clob.polymarket.com";
export const CHAIN_ID = 137;

export const DEFAULT_MARKET_ID =
  "0x405534c03f82e56a397478db7b068dbb683fb46c976265f650ba6510200749da";

// ==============================
// Ethers provider
const provider = new ethers.providers.JsonRpcProvider(POLYGON_RPC_URL);

// ==============================
// Wallet initialization
const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
if (!privateKey) {
  throw new Error(
    "NEXT_PUBLIC_PRIVATE_KEY is not defined in the environment variables."
  );
}

const wallet = new ethers.Wallet(privateKey, provider);

// ==============================
// ClobClient instance
export const clobClient = new ClobClient(
  CLOB_API_URL,
  CHAIN_ID,
  wallet,
  undefined,
  SignatureType.EOA
);
