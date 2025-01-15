import { OrderBookSummary } from "@polymarket/clob-client/dist/types";

// Mock data
const mockOrderBooks: OrderBookSummary[] = [
  {
    market: "BTC-USD",
    asset_id: "12345",
    timestamp: new Date().toISOString(),
    bids: [
      { price: "32000", size: "0.5" },
      { price: "31950", size: "1.0" },
    ],
    asks: [
      { price: "32100", size: "0.6" },
      { price: "32200", size: "0.4" },
    ],
    hash: "abc123hash",
  },
  {
    market: "ETH-USD",
    asset_id: "67890",
    timestamp: new Date().toISOString(),
    bids: [
      { price: "2000", size: "10" },
      { price: "1950", size: "8" },
    ],
    asks: [
      { price: "2050", size: "5" },
      { price: "2100", size: "6" },
    ],
    hash: "def456hash",
  },
];

//
// Utility Functions
//

/**
 * Get an order book by market name.
 * @param market - The market to fetch (e.g., "BTC-USD").
 * @returns The order book summary for the market or undefined if not found.
 */
export const getOrderBookByMarket = (
  market: string
): OrderBookSummary | undefined => {
  return mockOrderBooks.find((orderBook) => orderBook.market === market);
};

/**
 * Get all bids for a specific market.
 * @param market - The market to fetch (e.g., "BTC-USD").
 * @returns An array of bids or an empty array if market is not found.
 */
export const getBidsByMarket = (market: string) => {
  const orderBook = getOrderBookByMarket(market);
  return orderBook ? orderBook.bids : [];
};

/**
 * Get all asks for a specific market.
 * @param market - The market to fetch (e.g., "BTC-USD").
 * @returns An array of asks or an empty array if market is not found.
 */
export const getAsksByMarket = (market: string) => {
  const orderBook = getOrderBookByMarket(market);
  return orderBook ? orderBook.asks : [];
};

/**
 * Combine bids and asks into a normalized dataset.
 * @param market - The market to fetch (e.g., "BTC-USD").
 * @returns A combined array of bids and asks with a "type" field.
 */
export const getCombinedOrderBookData = (market: string) => {
  const orderBook = getOrderBookByMarket(market);
  if (!orderBook) return [];
  return [
    ...orderBook.bids.map((bid) => ({
      price: Number(bid.price),
      size: Number(bid.size),
      type: "bid",
    })),
    ...orderBook.asks.map((ask) => ({
      price: Number(ask.price),
      size: Number(ask.size),
      type: "ask",
    })),
  ];
};

// Export everything
export { mockOrderBooks };
