export interface TokenData {
  token_id: string;
  outcome: string;
  price: number;
  winner: boolean;
  buyPrice: number | null;
}

export interface RewardRate {
  asset_address: string;
  rewards_daily_rate: number;
}

export interface Rewards {
  rates: RewardRate[];
  min_size: number;
  max_spread: number;
}

export interface MarketResponse {
  enable_order_book: boolean;
  active: boolean;
  closed: boolean;
  archived: boolean;
  accepting_orders: boolean;
  accepting_order_timestamp: string;
  minimum_order_size: number;
  minimum_tick_size: number;
  condition_id: string;
  question_id: string;
  question: string;
  description: string;
  market_slug: string;
  end_date_iso: string;
  game_start_time: string | null;
  seconds_delay: number;
  fpmm: string;
  maker_base_fee: number;
  taker_base_fee: number;
  notifications_enabled: boolean;
  neg_risk: boolean;
  neg_risk_market_id: string;
  neg_risk_request_id: string;
  icon: string;
  image: string;
  rewards: Rewards;
  is_50_50_outcome: boolean;
  tokens: TokenData[];
  tags: string[];
}
