import React from "react";
import { Box, Typography, Button, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { TokenData } from "@/types/polymarket";

interface OrderManagerProps {
  token?: TokenData[];
  isLoading?: boolean;
}

const OrderManager: React.FC<OrderManagerProps> = ({
  token = [],
  isLoading = false,
}) => {
  const heading = "Some Heading";
  const subHeading = "Some Sub Heading";

  const handleBuy = (outcome: string, tokenId: string, price: number) => {
    console.log(`Buy ${outcome} for token ID ${tokenId} at ${price}`);
  };

  const getButtonColor = (outcome: string) => {
    return outcome.toLowerCase() === "yes" ? "success" : "error";
  };

  if (isLoading || !token.length) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 6, md: 4 }}>
            <Skeleton variant="text" width="80%" height={40} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="60%" height={24} />
          </Grid>
          <Grid
            size={{ xs: 6, md: 2 }}
            sx={{
              textAlign: { xs: "right", md: "center" },
            }}
          >
            <Skeleton variant="text" width="100%" height={40} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mb: 2,
              }}
            >
              <Skeleton variant="rectangular" width="100%" height={48} />
              <Skeleton variant="rectangular" width="100%" height={48} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }

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
            {Math.round(token[0]?.price * 100)}%
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
