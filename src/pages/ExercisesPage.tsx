import { Box } from '@mui/material'
import { PageAppBar } from '../components/Layout/PageAppBar'
import { ExerciseLibrary } from '../components/Exercises/ExerciseLibrary'

export function ExercisesPage() {
  return (
    <Box>
      <PageAppBar title="Exercise Library" />
      <Box sx={{ p: 2, pb: 10 }}>
        <ExerciseLibrary />
      </Box>
    </Box>
  )
}
