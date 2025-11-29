import { Box, List, ListItem, ListItemText, Typography, IconButton, Chip, Stack } from '@mui/material'
import { Delete, Replay, Timer, BookmarkAdd } from '@mui/icons-material'
import { useWorkouts } from '../../hooks/useWorkouts'
import { useExercises } from '../../hooks/useExercises'
import { Workout } from '../../types'

interface Props {
  onRepeat?: (workout: Workout) => void
  onSaveAsTemplate?: (workout: Workout) => void
}

export function WorkoutHistory({ onRepeat, onSaveAsTemplate }: Props) {
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

  const formatDuration = (workout: Workout): string | null => {
    if (!workout.startTime || !workout.endTime) return null
    const start = new Date(workout.startTime).getTime()
    const end = new Date(workout.endTime).getTime()
    const seconds = Math.floor((end - start) / 1000)
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    if (hrs > 0) {
      return `${hrs}h ${mins}m`
    }
    return `${mins}m`
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
              {onSaveAsTemplate && (
                <IconButton edge="end" onClick={() => onSaveAsTemplate(workout)} title="Save as template">
                  <BookmarkAdd />
                </IconButton>
              )}
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
              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                <Typography variant="subtitle1">{formatDate(workout.date)}</Typography>
                <Chip size="small" label={`${workout.exercises.length} exercises`} />
                {formatDuration(workout) && (
                  <Chip size="small" icon={<Timer />} label={formatDuration(workout)} variant="outlined" />
                )}
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
