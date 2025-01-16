"use client";

import { useState } from "react";
import { CssBaseline, Box, Toolbar } from "@mui/material";

// Contexts
import { NotificationProvider } from "@/contexts/NotificationContext";

// Global Styles
import "../styles/globals.css";

// Components
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <CssBaseline />
        <NotificationProvider>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Header onMenuClick={toggleDrawer(true)} />
            <SideMenu
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
              }}
            >
              <Toolbar /> {/* Spacer for fixed AppBar */}
              {children}
            </Box>
            <Footer />
          </Box>
        </NotificationProvider>
      </body>
    </html>
  );
}
