import { useState } from 'react'
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
} from '@mui/material'
import { EmojiEvents } from '@mui/icons-material'
import { usePersonalRecords } from '../../hooks/usePersonalRecords'
import { useExercises } from '../../hooks/useExercises'
import { ProgressChart } from './ProgressChart'

export function PRDashboard() {
  const { records } = usePersonalRecords()
  const { getExercise, muscleGroups } = useExercises()
  const [selectedMuscle, setSelectedMuscle] = useState<string>('')
  const [selectedExercise, setSelectedExercise] = useState<string>('')

  const filteredRecords = records.filter(r => {
    const exercise = getExercise(r.exerciseId)
    if (!exercise) return false
    if (selectedMuscle && exercise.muscleGroup !== selectedMuscle) return false
    return true
  })

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    const maxA = Math.max(...Object.values(a.records))
    const maxB = Math.max(...Object.values(b.records))
    return maxB - maxA
  })

  const formatRecords = (recs: Record<number, number>) => {
    return Object.entries(recs)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([reps, weight]) => `${weight}kg x ${reps}`)
      .join(', ')
  }

  return (
    <Box>
      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Filter by muscle group</InputLabel>
        <Select
          value={selectedMuscle}
          label="Filter by muscle group"
          onChange={e => setSelectedMuscle(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {muscleGroups.map(mg => (
            <MenuItem key={mg} value={mg}>
              {mg}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {records.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <EmojiEvents sx={{ fontSize: 64, color: 'text.disabled' }} />
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            No personal records yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start logging workouts to track your PRs!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {sortedRecords.map(record => {
            const exercise = getExercise(record.exerciseId)
            if (!exercise) return null
            const maxWeight = Math.max(...Object.values(record.records))

            return (
              <Grid item xs={12} sm={6} key={record.exerciseId}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    border: selectedExercise === record.exerciseId ? 2 : 0,
                    borderColor: 'primary.main',
                  }}
                  onClick={() =>
                    setSelectedExercise(
                      selectedExercise === record.exerciseId ? '' : record.exerciseId
                    )
                  }
                >
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {exercise.name}
                        </Typography>
                        <Chip size="small" label={exercise.muscleGroup} sx={{ mt: 0.5 }} />
                      </Box>
                      <Typography variant="h5" color="primary" fontWeight="bold">
                        {maxWeight}kg
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {formatRecords(record.records)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      )}

      {selectedExercise && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Progress Chart
          </Typography>
          <ProgressChart exerciseId={selectedExercise} />
        </Box>
      )}
    </Box>
  )
}
