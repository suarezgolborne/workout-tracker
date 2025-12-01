import { useState, useCallback } from "react";
import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { BottomNav } from "./components/Layout/BottomNav";
import { SplashScreen } from "./components/Layout/SplashScreen";
import { WorkoutPage } from "./pages/WorkoutPage";
import { HistoryPage } from "./pages/HistoryPage";
import { ExercisesPage } from "./pages/ExercisesPage";
import { ProgressPage } from "./pages/ProgressPage";

function App() {
  // Show splash only once per session
  const [showSplash, setShowSplash] = useState(() => {
    const hasShown = sessionStorage.getItem("splashShown");
    return !hasShown;
  });

  const handleSplashComplete = useCallback(() => {
    // sessionStorage.setItem("splashShown", "true");
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <Box
        sx={(theme) => ({
          minHeight: "100vh",

          pb: `calc(${theme.spacing(8)} + env(safe-area-inset-bottom))`,
          pt: "env(safe-area-inset-top)",
        })}
      >
        <Routes>
          <Route path="/" element={<WorkoutPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/progress" element={<ProgressPage />} />
        </Routes>
        <BottomNav />
      </Box>
    </>
  );
}

export default App;
