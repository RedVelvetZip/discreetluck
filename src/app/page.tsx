"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";

// Config
import { clobClient, DEFAULT_MARKET_ID } from "@/config/clobConfig";

// Types
import { MarketResponse, TokenData } from "@/types/polymarket";

// Providers
import { useNotification } from "@/contexts/NotificationContext";

// Components
import OrderManager from "./components/polymarket/OrderManager";
import LineChart from "./components/charts/LineChart";

// Mock Data
import { getCombinedOrderBookData } from "./data/mockOrderBookSummary";
import PageHeader from "./components/common/PageHeader";

// Mock Data
const btcOrderBookData = getCombinedOrderBookData("BTC-USD");

export default function MarketPage() {
  const [marketData, setMarketData] = useState<MarketResponse | null>(null);
  const [tokenData, setTokenData] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { showNotification } = useNotification();

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

  useEffect(() => {
    if (error) {
      showNotification(error, "error");
    }
  }, [error, showNotification]);

  return (
    <Box>
      <PageHeader
        icon={marketData?.icon}
        title={marketData?.question}
        isLoading={loading}
      />

      {/* Main Content Section */}
      <Box>
        <Box>
          <LineChart
            data={btcOrderBookData}
            xAxis="price"
            yAxis="size"
            title="BTC-USD Order Book Summary - Mock Data"
            color="#1976d2"
            xAxisFormatter={(value) => `$${value}`}
            tooltipFormatter={(value) => `${value} units`}
            tooltipLabelFormatter={(label) => `Price: $${label}`}
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <OrderManager token={tokenData} isLoading={loading} />
        </Box>
      </Box>
    </Box>
  );
}
