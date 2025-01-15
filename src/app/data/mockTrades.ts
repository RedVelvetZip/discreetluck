import { Trade, Side } from "@polymarket/clob-client/dist/types";

export const mockTrades: Trade[] = [
  {
    id: "trade1",
    taker_order_id: "order1",
    market: "BTC-USD",
    asset_id: "12345",
    side: Side.BUY,
    size: "0.2",
    fee_rate_bps: "10",
    price: "32100",
    status: "completed",
    match_time: new Date().toISOString(),
    last_update: new Date().toISOString(),
    outcome: "success",
    bucket_index: 0,
    owner: "0xMakerAddress",
    maker_address: "0xMakerAddress",
    maker_orders: [],
    transaction_hash: "0x123abc",
    trader_side: "TAKER",
  },
  {
    id: "trade2",
    taker_order_id: "order2",
    market: "BTC-USD",
    asset_id: "12345",
    side: Side.SELL,
    size: "0.1",
    fee_rate_bps: "15",
    price: "32200",
    status: "completed",
    match_time: new Date().toISOString(),
    last_update: new Date().toISOString(),
    outcome: "success",
    bucket_index: 1,
    owner: "0xAnotherMaker",
    maker_address: "0xAnotherMaker",
    maker_orders: [],
    transaction_hash: "0x456def",
    trader_side: "TAKER",
  },
];

/**
 * Normalize trade data for charting.
 * @param trades - List of trades.
 * @returns Normalized data for the chart.
 */
export const normalizeTradesForChart = (trades: Trade[]) => {
  return trades.map((trade) => ({
    time: new Date(trade.match_time).toLocaleTimeString(), // Format time
    price: Number(trade.price),
    size: Number(trade.size),
    side: trade.side,
  }));
};

/**
 * Filter trades by market.
 * @param trades - List of trades.
 * @param market - Market to filter by (e.g., "BTC-USD").
 * @returns Filtered trades for the specified market.
 */
export const filterTradesByMarket = (trades: Trade[], market: string) => {
  return trades.filter((trade) => trade.market === market);
};
