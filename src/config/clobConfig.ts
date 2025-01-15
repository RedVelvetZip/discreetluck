import { ClobClient } from "@polymarket/clob-client";
import { SignatureType } from "@polymarket/order-utils";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  "https://polygon-rpc.com"
);
const wallet = new ethers.Wallet(
  process.env.NEXT_PUBLIC_PRIVATE_KEY as string,
  provider
);

export const clobClient = new ClobClient(
  "https://clob.polymarket.com",
  137,
  wallet,
  undefined,
  SignatureType.EOA
);
