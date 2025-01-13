import { Typography } from "@mui/material";

// Config
import routes from "../config/routes";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the {routes.home.label} Page!
      </Typography>
      <Typography>Some Content</Typography>
    </main>
  );
}
