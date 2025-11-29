import { Box, List, ListItem, ListItemText, Typography, IconButton, Chip, Stack } from '@mui/material'
import { Delete, Replay } from '@mui/icons-material'
import { useWorkouts } from '../../hooks/useWorkouts'
import { useExercises } from '../../hooks/useExercises'
import { Workout } from '../../types'

interface Props {
  onRepeat?: (workout: Workout) => void
}

export function WorkoutHistory({ onRepeat }: Props) {
  const { workouts, deleteWorkout } = useWorkouts()
  const { getExercise } = useExercises()

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('sv-SE', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  }

  const getWorkoutSummary = (workout: Workout) => {
    const exercises = workout.exercises
      .map(e => getExercise(e.exerciseId)?.name || 'Unknown')
      .slice(0, 3)
    const more = workout.exercises.length > 3 ? ` +${workout.exercises.length - 3}` : ''
    return exercises.join(', ') + more
  }

  const getTotalVolume = (workout: Workout) => {
    return workout.exercises.reduce((total, ex) => {
      return total + ex.sets.reduce((sum, s) => sum + s.reps * s.weight, 0)
    }, 0)
  }

  if (workouts.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography color="text.secondary">No workouts logged yet</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Start logging your first workout!
        </Typography>
      </Box>
    )
  }

  return (
    <List disablePadding>
      {workouts.map(workout => (
        <ListItem
          key={workout.id}
          divider
          secondaryAction={
            <Stack direction="row" spacing={0.5}>
              {onRepeat && (
                <IconButton edge="end" onClick={() => onRepeat(workout)} title="Repeat workout">
                  <Replay />
                </IconButton>
              )}
              <IconButton edge="end" onClick={() => deleteWorkout(workout.id)} color="error">
                <Delete />
              </IconButton>
            </Stack>
          }
        >
          <ListItemText
            primary={
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="subtitle1">{formatDate(workout.date)}</Typography>
                <Chip size="small" label={`${workout.exercises.length} exercises`} />
              </Stack>
            }
            secondary={
              <>
                <Typography variant="body2" color="text.secondary">
                  {getWorkoutSummary(workout)}
                </Typography>
                <Typography variant="caption" color="primary">
                  Total volume: {getTotalVolume(workout).toLocaleString()}kg
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  )
}
