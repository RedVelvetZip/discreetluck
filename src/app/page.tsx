"use client";

import {
  Typography,
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  Card,
  CardContent,
  Button,
  CardActions,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";

// Components
import LineChart from "./components/charts/LineChart";
import { getCombinedOrderBookData } from "./data/mockOrderBookSummary";
import {
  mockTrades,
  normalizeTradesForChart,
  filterTradesByMarket,
} from "./data/mockTrades";

// Mock Data
const btcOrderBookData = getCombinedOrderBookData("BTC-USD");
const btcTradeData = normalizeTradesForChart(
  filterTradesByMarket(mockTrades, "BTC-USD")
);

export default function MarketPage() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <main style={{ maxWidth: "1200px", margin: "auto" }}>
      {/* Header Section */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Some Content
        </Typography>
        <Typography variant="body1" gutterBottom color="textSecondary">
          A longer description of the content goes here.
        </Typography>
      </Box>

      {/* Tabs Section */}
      <Box mb={4}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Order Book" />
          <Tab label="Trade Activity" />
          <Tab label="Market Info" />
        </Tabs>
      </Box>

      {/* Content Section */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          {/* Data Summary From Data File */}
          <Box>
            <List>
              <Typography variant="h6" gutterBottom>
                Summary
              </Typography>
              <Typography variant="body1" gutterBottom>
                Longer Summary Information
              </Typography>
              <ListItem>
                <Typography variant="body2">Some Information</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">Some Information</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">Some Information</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">Some Information</Typography>
              </ListItem>
            </List>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <Box>
            <Box>
              {activeTab === 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Order Book
                  </Typography>
                  <LineChart
                    data={btcOrderBookData}
                    xAxis="price"
                    yAxis="size"
                    title="BTC-USD Order Book Summary"
                    color="#1976d2"
                    xAxisFormatter={(value) => `$${value}`}
                    tooltipFormatter={(value) => `${value} units`}
                    tooltipLabelFormatter={(label) => `Price: $${label}`}
                  />
                </Box>
              )}
              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Trade Activity
                  </Typography>
                  <LineChart
                    data={btcTradeData}
                    xAxis="time"
                    yAxis="price"
                    title="BTC-USD Trade Activity"
                    color="#ff5722"
                    xAxisFormatter={(value) => String(value)}
                    tooltipFormatter={(value) => `$${value}`}
                    tooltipLabelFormatter={(label) => `Time: ${label}`}
                  />
                </Box>
              )}
              {activeTab === 2 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Market Info
                  </Typography>
                  <Typography variant="body1">
                    Market details, idk something goes here.
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid size={12}>
          <Box>
            <Card>
              <CardContent>
                <Box mb={2}>
                  <Typography variant="h5" component="div" gutterBottom>
                    BTC-USD
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Current Price: <strong>$32,100</strong>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Highest Bid: <strong>$32,000</strong>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Lowest Ask: <strong>$32,100</strong>
                  </Typography>
                </Box>
              </CardContent>

              {/* Card Actions */}
              <CardActions sx={{ justifyContent: "space-between" }}>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ flex: "1", marginRight: 6 }}
                >
                  Buy
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ flex: "1", marginLeft: 6 }}
                >
                  Sell
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </main>
  );
}
