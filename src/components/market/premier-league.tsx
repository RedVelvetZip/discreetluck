"use client";

import React, { useEffect, useState } from "react";
import { fetchMarkets } from "../../utils/clob-client";

const PremierLeagueMarket: React.FC = () => {
  const [market, setMarket] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchMarkets();

        const premierLeagueMarket = data.data.find(
          (market: any) =>
            market.question === "Who will win the 2025 Premier League?"
        );

        if (premierLeagueMarket) {
          setMarket(premierLeagueMarket);
        } else {
          setError("Market not found.");
        }
      } catch (err) {
        setError("Failed to fetch market data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Premier League Market</h1>
      {loading ? (
        <p>Loading market data...</p>
      ) : error ? (
        <p>{error}</p>
      ) : market ? (
        <div>
          <p>
            <strong>Question:</strong> {market.question}
          </p>
          <p>
            <strong>Market Slug:</strong> {market.market_slug}
          </p>
          {/* <p>
            <strong>Min Incentive Size:</strong> {market.min_incentive_size}
          </p>
          <p>
            <strong>Max Incentive Spread:</strong> {market.max_incentive_spread}
          </p> */}
          <p>
            <strong>Minimum Order Size:</strong> {market.minimum_order_size}
          </p>
          <p>
            <strong>Minimum Tick Size:</strong> {market.minimum_tick_size}
          </p>

          <ul>
            {market.tokens.map((token: any, index: number) => (
              <li key={index}>
                <p>
                  <strong>Token ID:</strong> {token.token_id}
                  {""}
                  <strong> Outcome:</strong> {token.outcome}
                </p>
              </li>
            ))}
          </ul>

          <h2>Rewards</h2>
          {market.rewards ? (
            <div>
              <p>
                <strong>Min Size:</strong> {market.rewards.min_size}
              </p>
              <p>
                <strong>Max Spread:</strong> {market.rewards.max_spread}
              </p>
            </div>
          ) : (
            <p>No rewards data available</p>
          )}
        </div>
      ) : (
        <p>No market data available.</p>
      )}
    </div>
  );
};

export default PremierLeagueMarket;
