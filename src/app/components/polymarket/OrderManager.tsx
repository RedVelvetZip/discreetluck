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
      const data = await fetchOrderBook(
        "0x37088c9b2349c07fab4a24fd9d95aabc544b3b49dcd417f146fdc4b90d399d00"
      );
      setOrderBook(data);
    } catch (error) {
      console.error("Error fetching order book:", error);
    } finally {
      setLoading(false);
    }
  };

  //token_id yes 6856495334599070327400479404766108364224261454141327193457127201769494631355
  //token_id no 83900161665955113552429010729973027044975695664005576591523498118851571751116

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
