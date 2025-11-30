import { ReactNode } from "react";
import { AppBar, Toolbar, Typography, SxProps, Theme } from "@mui/material";

interface PageAppBarProps {
  title: string;
  actions?: ReactNode;
  sx?: SxProps<Theme>;
}

export function PageAppBar({ title, actions, sx }: PageAppBarProps) {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ width: "calc(100% - 32px)", mx: "auto", mt: 2, ...sx }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flex: 1 }}>
          {title}
        </Typography>
        {actions}
      </Toolbar>
    </AppBar>
  );
}
