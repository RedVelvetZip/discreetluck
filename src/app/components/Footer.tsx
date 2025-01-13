"use client";

import { Box, Typography } from "@mui/material";

// Config
import appConfig from "../../config/appConfig";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        p: 2,
        mt: "auto",
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} {appConfig.appName}. All rights reserved.
      </Typography>
    </Box>
  );
}
