"use client";

import { useState } from "react";

import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";

import { OrderBookSummary } from "@polymarket/clob-client";
import { fetchMarket, fetchTokenDetails } from "@/services/clobService";

export default function OrderManager() {
  const [market, setMarket] = useState<OrderBookSummary | null>(null);
  const [tokens, setTokens] = useState<any[]>([]);
  const [loadingMarket, setLoadingMarket] = useState(false);
  const [loadingTokens, setLoadingTokens] = useState(false);

  const handleFetchMarket = async () => {
    setLoadingMarket(true);
    try {
      const data = await fetchMarket(
        "0x405534c03f82e56a397478db7b068dbb683fb46c976265f650ba6510200749da"
      );
      setMarket(data);
    } catch (error) {
      console.error("Error fetching market:", error);
    } finally {
      setLoadingMarket(false);
    }
  };

  const handleFetchTokenDetails = async () => {
    if (!market || !market.tokens) return;

    setLoadingTokens(true);
    try {
      const tokenDetails = await Promise.all(
        market.tokens.map((token) => fetchTokenDetails(token.token_id))
      );
      setTokens(tokenDetails);
    } catch (error) {
      console.error("Error fetching token details:", error);
    } finally {
      setLoadingTokens(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order Manager
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleFetchMarket}
        disabled={loadingMarket}
        startIcon={loadingMarket && <CircularProgress size={20} />}
        sx={{ mr: 2 }}
      >
        {loadingMarket ? "Loading Market..." : "Fetch Market"}
      </Button>
      {market && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleFetchTokenDetails}
          disabled={loadingTokens}
          startIcon={loadingTokens && <CircularProgress size={20} />}
        >
          {loadingTokens ? "Loading Tokens..." : "Fetch Token Details"}
        </Button>
      )}
      {market && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Market Details
          </Typography>
          <Paper elevation={3} sx={{ p: 2, overflow: "auto" }}>
            <pre>{JSON.stringify(market, null, 2)}</pre>
          </Paper>
        </Box>
      )}
      {tokens.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Token Details
          </Typography>
          <Paper elevation={3} sx={{ p: 2, overflow: "auto" }}>
            <pre>{JSON.stringify(tokens, null, 2)}</pre>
          </Paper>
        </Box>
      )}
    </Container>
  );
}
