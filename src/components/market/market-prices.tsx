"use client";

import React, { useEffect, useState } from "react";

// hardcoded ids. These come from the get markets and get market info API calls
const WIN_TOKEN_ID = "";
const LOSE_TOKEN_ID = "";

const fetchPrices = async (tokenId: string) => {
  const response = await fetch(
    `https://clob.polymarket.com/price?token_id=${tokenId}&side=buy`
  );
  const buyPrice = await response.json();

  const sellResponse = await fetch(
    `https://clob.polymarket.com/price?token_id=${tokenId}&side=sell`
  );
  const sellPrice = await sellResponse.json();

  return {
    buy: buyPrice.price,
    sell: sellPrice.price,
  };
};

const MarketPrices: React.FC<{ onSendPrices: any }> = ({ onSendPrices }) => {
  const [winPrices, setWinPrices] = useState<{
    buy: string;
    sell: string;
  } | null>(null);
  const [LOSEPrices, setLosePrices] = useState<{
    buy: string;
    sell: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleSendPrices = () => {
    if (onSendPrices) {
      const data = {
        win: winPrices,
        LOSE: LOSEPrices,
      };
      onSendPrices(data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const demPrices = await fetchPrices(WIN_TOKEN_ID);
        setWinPrices(demPrices);

        const repPrices = await fetchPrices(LOSE_TOKEN_ID);
        setLosePrices(repPrices);
      } catch (err) {
        setError("Failed to fetch prices.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Premier League Market Prices</h1>
      {loading ? (
        <p>Loading prices...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <br />
          <h2>Liverpool Win</h2>
          {winPrices ? (
            <p>
              <strong>BUY Price:</strong> {winPrices.buy} <br />
              <strong>SELL Price:</strong> {winPrices.sell}
            </p>
          ) : (
            <p>No price data for Livepool Win</p>
          )}
          <br />
        </div>
      )}
      <button
        onClick={handleSendPrices}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Submit Prices to Nostr
      </button>
    </div>
  );
};

export default MarketPrices;
