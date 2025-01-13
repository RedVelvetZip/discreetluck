"use client";

import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Config
import appConfig from "../../config/appConfig";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        {/* App Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {appConfig.appName}
        </Typography>

        {/* Menu Button */}
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
