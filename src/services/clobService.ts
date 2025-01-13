import { fetcher } from "@/utils/fetcher";
import { Side } from "@polymarket/clob-client";

// Config
import clobClient from "../config/clobConfig";

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
