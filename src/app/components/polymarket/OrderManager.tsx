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
import { fetchMarket } from "@/services/clobService";

export default function OrderManager() {
  const [market, setMarket] = useState<OrderBookSummary | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetchMarket = async () => {
    setLoading(true);
    try {
      const data = await fetchMarket(
        "0x405534c03f82e56a397478db7b068dbb683fb46c976265f650ba6510200749da"
      );
      setMarket(data);
    } catch (error) {
      console.error("Error fetching market:", error);
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
        onClick={handleFetchMarket}
        disabled={loading}
        startIcon={loading && <CircularProgress size={20} />}
      >
        {loading ? "Loading Order Book..." : "Fetch Order Book"}
      </Button>
      {market && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Order Book
          </Typography>
          <Paper elevation={3} sx={{ p: 2, overflow: "auto" }}>
            <pre>{JSON.stringify(market, null, 2)}</pre>
          </Paper>
        </Box>
      )}
    </Container>
  );
}
