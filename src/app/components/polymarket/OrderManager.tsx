import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { TokenData } from "@/types/polymarket";

interface OrderManagerProps {
  token: TokenData[];
}

const OrderManager: React.FC<OrderManagerProps> = ({ token }) => {
  // NOTE: This is a dummy data
  const heading = "Some Heading";
  const subHeading = "Some Sub Heading";

  const handleBuy = (outcome: string, tokenId: string, price: number) => {
    console.log(`Buy ${outcome} for token ID ${tokenId} at ${price}`);
  };

  const getButtonColor = (outcome: string) => {
    return outcome.toLowerCase() === "yes" ? "success" : "error";
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 6, md: 4 }}>
          <Typography variant="h4" gutterBottom>
            {heading}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {subHeading}
          </Typography>
        </Grid>
        <Grid
          size={{ xs: 6, md: 2 }}
          sx={{
            textAlign: { xs: "right", md: "center" },
          }}
        >
          <Typography variant="h4" gutterBottom>
            {Math.round(token[0].price * 100)}%
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 2,
            }}
          >
            {token.map((t) => (
              <Button
                key={t.token_id}
                variant="contained"
                size="large"
                color={getButtonColor(t.outcome)}
                fullWidth
                onClick={() => handleBuy(t.outcome, t.token_id, t.price)}
              >
                Buy {t.outcome} {Math.round(t.price * 100)}¢
              </Button>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderManager;
