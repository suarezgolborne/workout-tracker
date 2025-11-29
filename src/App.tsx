import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import { BottomNav } from './components/Layout/BottomNav'
import { WorkoutPage } from './pages/WorkoutPage'
import { HistoryPage } from './pages/HistoryPage'
import { ExercisesPage } from './pages/ExercisesPage'
import { ProgressPage } from './pages/ProgressPage'

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 8 }}>
      <Routes>
        <Route path="/" element={<WorkoutPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/exercises" element={<ExercisesPage />} />
        <Route path="/progress" element={<ProgressPage />} />
      </Routes>
      <BottomNav />
    </Box>
  )
}

export default App
