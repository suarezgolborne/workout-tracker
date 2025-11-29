import { Box, Typography, AppBar, Toolbar } from '@mui/material'
import { WorkoutHistory } from '../components/Workout/WorkoutHistory'

export function HistoryPage() {
  return (
    <Box>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6">Workout History</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>
        <WorkoutHistory />
      </Box>
    </Box>
  )
}
