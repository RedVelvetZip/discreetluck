import { fetcher } from "@/utils/fetcher";
import { Side } from "@polymarket/clob-client";

// Config
import { CLOB_API_URL, clobClient } from "../config/clobConfig";

// Types
import { MarketResponse, TokenData } from "@/types/polymarket";

/**
 * Fetch details for a specific market.
 * @param conditionId The ID of the market.
 * @returns The market data.
 */
export const fetchMarket = async (
  conditionId: string
): Promise<MarketResponse> => {
  if (!conditionId) {
    throw new Error("Condition ID is required to fetch market data.");
  }

  const url = `${CLOB_API_URL}/markets/${conditionId}`;
  return fetcher<MarketResponse>(url);
};

/**
 * Fetch details for a specific token.
 * @param token A token object containing the base token data.
 * @returns The enriched token details.
 */
export const fetchTokenDetails = async (
  token: TokenData
): Promise<TokenData> => {
  if (!token.token_id) {
    throw new Error("Token ID is required to fetch token details.");
  }

  try {
    const buyUrl = `${CLOB_API_URL}/price?token_id=${token.token_id}&side=buy`;

    const buyResponse = await fetcher<{ price: number }>(buyUrl);

    return {
      ...token,
      buyPrice: buyResponse?.price || null,
    };
  } catch (error) {
    console.error(`Error fetching details for token ${token.token_id}:`, error);
    throw new Error(
      `Failed to fetch token details for tokenId: ${token.token_id}`
    );
  }
};

// =================================================================================================
// OLD

/**
 * Fetch order book data for a specific market.
 * @param marketId The ID of the market.
 * @returns The order book data.
 */
export async function fetchOrderBook(marketId: string) {
  try {
    const orderBook = await clobClient.getOrderBook(marketId);
    return orderBook;
  } catch (error) {
    console.error("Error fetching order book:", error);
    throw error;
  }
}

/**
 * Create and post an order to the Polymarket API.
 * @param tokenId The token ID for the market.
 * @param price The price for the order.
 * @param side The side of the order (buy/sell).
 * @param size The size of the order.
 * @returns The response from the API.
 */
export async function createAndPostOrder({
  tokenId,
  price,
  side,
  size,
}: {
  tokenId: string;
  price: number;
  side: Side;
  size: number;
}) {
  try {
    // Create the order
    const order = await clobClient.createOrder({
      tokenID: tokenId,
      price,
      side,
      size,
      feeRateBps: 0,
    });

    // Post the order to the API
    const response = await clobClient.postOrder(order);
    return response;
  } catch (error) {
    console.error("Error creating or posting order:", error);
    throw error;
  }
}

/**
 * Example of a basic GET request using the fetcher utility.
 * @param endpoint The endpoint to call.
 * @returns The response data.
 */
export async function fetchExampleData(endpoint: string) {
  try {
    const response = await fetcher(endpoint);
    return response;
  } catch (error) {
    console.error("Error fetching example data:", error);
    throw error;
  }
}
