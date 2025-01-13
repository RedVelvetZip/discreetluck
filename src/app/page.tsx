import { Typography, Box } from "@mui/material";

// Components
// import OrderManager from "./components/polymarket/OrderManager";

// Config
import routes from "../config/routes";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the {routes.home.label} Page!
      </Typography>
      <Typography variant="body1" gutterBottom>
        This is the homepage of your application. Use the navigation to explore
        other sections.
      </Typography>

      {/* Add OrderManager Component */}
      <Box mt={4}>
        {/* uncomment when config values have been added */}
        {/* <OrderManager /> */}
      </Box>
    </main>
  );
}
