import { Box, Typography, AppBar, Toolbar } from '@mui/material'
import { ExerciseLibrary } from '../components/Exercises/ExerciseLibrary'

export function ExercisesPage() {
  return (
    <Box>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6">Exercise Library</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2, pb: 10 }}>
        <ExerciseLibrary />
      </Box>
    </Box>
  )
}
