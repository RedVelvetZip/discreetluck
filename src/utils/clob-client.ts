import { ClobClient, BookParams, Side } from "@polymarket/clob-client";

export const initializeClobClient = async (): Promise<ClobClient> => {
  const chainId = 137; // Polygon mainnet chain id
  const clobClient = new ClobClient(
    "https://clob.polymarket.com",
    chainId,
    undefined // no wallet signer required for read-only
  );

  return clobClient;
};

export const fetchMidpoints = async (tokenIds: string[]) => {
  const client = await initializeClobClient();

  const params: BookParams[] = tokenIds.map((id) => ({
    token_id: id,
    side: Side.BUY,
  }));

  const midpoints = await client.getMidpoints(params);
  return midpoints;
};

export const fetchMarkets = async (cursor: string = "") => {
  const response = await fetch(
    `https://clob.polymarket.com/markets?next_cursor=${cursor}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch markets");
  }

  const data = await response.json();
  return data;
};
