export interface Order {
  tokenId: string;
  price: number;
  side: "buy" | "sell";
  size: number;
}

export interface OrderResponse {
  id: string;
  status: string;
  price: number;
  size: number;
}
