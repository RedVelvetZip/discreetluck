"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SwipeableDrawer,
  List,
  Toolbar,
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// Config
import routes from "../../config/routes";

export default function SideMenu({
  open,
  onClose,
  onOpen,
}: {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}) {
  const pathname = usePathname();

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      sx={{
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box>
        <List>
          {Object.values(routes).map((route) => (
            <ListItemButton
              key={route.path}
              component={Link}
              href={route.path}
              onClick={onClose}
              selected={pathname === route.path}
            >
              {/* Render the icon dynamically */}
              <ListItemIcon>{React.createElement(route.icon)}</ListItemIcon>
              <ListItemText primary={route.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  );
}
