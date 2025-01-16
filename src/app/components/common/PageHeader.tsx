import React from "react";
import { Box, Avatar, Typography, Skeleton } from "@mui/material";

interface PageHeaderProps {
  icon?: string;
  title?: string;
  avatarSize?: number;
  isLoading?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  icon,
  title,
  avatarSize = 56,
  isLoading = false,
}) => {
  if (isLoading || !title) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Skeleton
          variant="circular"
          sx={{
            width: avatarSize,
            height: avatarSize,
            mr: 2,
          }}
        />
        <Skeleton variant="text" width={300} height={40} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
      {icon && (
        <Avatar
          src={icon}
          alt={`${title} Icon`}
          sx={{
            width: avatarSize,
            height: avatarSize,
            mr: 2,
          }}
        />
      )}
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
    </Box>
  );
};

export default PageHeader;
