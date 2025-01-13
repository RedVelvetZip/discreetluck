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
import { fetchOrderBook } from "@/services/clobService";

export default function OrderManager() {
  const [orderBook, setOrderBook] = useState<OrderBookSummary | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetchOrderBook = async () => {
    setLoading(true);
    try {
      const data = await fetchOrderBook("example_market_id");
      setOrderBook(data);
    } catch (error) {
      console.error("Error fetching order book:", error);
    } finally {
      setLoading(false);
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
        onClick={handleFetchOrderBook}
        disabled={loading}
        startIcon={loading && <CircularProgress size={20} />}
      >
        {loading ? "Loading Order Book..." : "Fetch Order Book"}
      </Button>
      {orderBook && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Order Book
          </Typography>
          <Paper elevation={3} sx={{ p: 2, overflow: "auto" }}>
            <pre>{JSON.stringify(orderBook, null, 2)}</pre>
          </Paper>
        </Box>
      )}
    </Container>
  );
}
