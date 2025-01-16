"use client";

import { useEffect, useState } from "react";
import { Box, Avatar, Typography } from "@mui/material";

// Config
import { clobClient, DEFAULT_MARKET_ID } from "@/config/clobConfig";

// Types
import { MarketResponse, TokenData } from "@/types/polymarket";

// Components
import OrderManager from "./components/polymarket/OrderManager";

export default function MarketPage() {
  const [marketData, setMarketData] = useState<MarketResponse | null>(null);
  const [tokenData, setTokenData] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch market and token details
  useEffect(() => {
    const fetchMarketAndTokenDetails = async () => {
      setLoading(true);

      try {
        const marketResponse = await clobClient.getMarket(DEFAULT_MARKET_ID);
        setMarketData(marketResponse);

        if (marketResponse.tokens) {
          setTokenData(marketResponse.tokens);
        }
      } catch (err) {
        console.error("Error fetching market data:", err);
        setError("Failed to load market data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMarketAndTokenDetails();
  }, []);

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        {marketData?.icon && (
          <Avatar
            src={marketData.icon}
            alt="Market Icon"
            sx={{
              width: 56,
              height: 56,
              mr: 2,
            }}
          />
        )}

        {marketData?.question && (
          <Typography variant="h4" component="h1">
            {marketData.question}
          </Typography>
        )}
      </Box>

      {/* Main Content Section */}
      <Box>
        <OrderManager token={tokenData} isLoading={loading} />
      </Box>
    </Box>
  );
}
