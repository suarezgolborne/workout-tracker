import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { FitnessCenter, History, List, TrendingUp } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Workout", icon: <FitnessCenter />, path: "/" },
  { label: "History", icon: <History />, path: "/history" },
  { label: "Exercises", icon: <List />, path: "/exercises" },
  { label: "Progress", icon: <TrendingUp />, path: "/progress" },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentValue = navItems.findIndex(
    (item) => item.path === location.pathname
  );

  const handleNavChange = (_: React.SyntheticEvent, newValue: number) => {
    window.scrollTo(0, 0);
    navigate(navItems[newValue].path);
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "background.paper",
        mx: "auto",
        width: "calc(100% - 32px)",
        mb: 2,
      }}
      elevation={3}
    >
      <BottomNavigation
        value={currentValue >= 0 ? currentValue : 0}
        onChange={handleNavChange}
        showLabels
        sx={{
          "& .MuiBottomNavigationAction-root": {
            minWidth: 0,
            paddingTop: 3,
            paddingBottom: 2,
            background: "none",
          },
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.path}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
