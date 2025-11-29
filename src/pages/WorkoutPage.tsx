import { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Fab,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material'
import { Add, Save, Close } from '@mui/icons-material'
import { ExerciseLibrary } from '../components/Exercises/ExerciseLibrary'
import { ExerciseEntry } from '../components/Workout/ExerciseEntry'
import { useWorkouts } from '../hooks/useWorkouts'
import { useExercises } from '../hooks/useExercises'
import { usePersonalRecords } from '../hooks/usePersonalRecords'
import { ExerciseLog, Exercise, Workout } from '../types'

export function WorkoutPage() {
  const [activeWorkout, setActiveWorkout] = useState<ExerciseLog[]>([])
  const [exerciseDialogOpen, setExerciseDialogOpen] = useState(false)
  const [notes, setNotes] = useState('')
  const [workoutStarted, setWorkoutStarted] = useState(false)

  const { addWorkout } = useWorkouts()
  const { getExercise } = useExercises()
  const { updateRecordsFromWorkout } = usePersonalRecords()

  const handleAddExercise = (exercise: Exercise) => {
    if (activeWorkout.some(e => e.exerciseId === exercise.id)) {
      setExerciseDialogOpen(false)
      return
    }
    setActiveWorkout(prev => [
      ...prev,
      { exerciseId: exercise.id, sets: [{ reps: 10, weight: 0 }] },
    ])
    setExerciseDialogOpen(false)
  }

  const handleUpdateExercise = (index: number, log: ExerciseLog) => {
    setActiveWorkout(prev => prev.map((e, i) => (i === index ? log : e)))
  }

  const handleDeleteExercise = (index: number) => {
    setActiveWorkout(prev => prev.filter((_, i) => i !== index))
  }

  const handleSaveWorkout = () => {
    if (activeWorkout.length === 0) return

    const workout: Omit<Workout, 'id'> = {
      date: new Date().toISOString(),
      exercises: activeWorkout.filter(e => e.sets.length > 0),
      notes: notes || undefined,
    }

    const saved = addWorkout(workout)
    updateRecordsFromWorkout(saved)

    setActiveWorkout([])
    setNotes('')
    setWorkoutStarted(false)
  }

  const handleStartWorkout = () => {
    setWorkoutStarted(true)
  }

  const handleCancelWorkout = () => {
    setActiveWorkout([])
    setNotes('')
    setWorkoutStarted(false)
  }

  if (!workoutStarted) {
    return (
      <Box sx={{ textAlign: 'center', pt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Ready to workout?
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Start a new session to log your exercises
        </Typography>
        <Button variant="contained" size="large" onClick={handleStartWorkout} startIcon={<Add />}>
          Start Workout
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ pb: 10 }}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
            Current Workout
          </Typography>
          <IconButton onClick={handleCancelWorkout} color="error">
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        {activeWorkout.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">No exercises added yet</Typography>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => setExerciseDialogOpen(true)}
              sx={{ mt: 2 }}
            >
              Add Exercise
            </Button>
          </Box>
        ) : (
          <>
            {activeWorkout.map((log, index) => {
              const exercise = getExercise(log.exerciseId)
              if (!exercise) return null
              return (
                <ExerciseEntry
                  key={log.exerciseId}
                  exercise={exercise}
                  log={log}
                  onChange={l => handleUpdateExercise(index, l)}
                  onDelete={() => handleDeleteExercise(index)}
                />
              )
            })}

            <Button
              variant="outlined"
              fullWidth
              startIcon={<Add />}
              onClick={() => setExerciseDialogOpen(true)}
              sx={{ mb: 2 }}
            >
              Add Exercise
            </Button>

            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="Workout notes (optional)"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              sx={{ mb: 2 }}
            />
          </>
        )}
      </Box>

      {activeWorkout.length > 0 && (
        <Fab
          color="primary"
          variant="extended"
          onClick={handleSaveWorkout}
          sx={{ position: 'fixed', bottom: 80, right: 16 }}
        >
          <Save sx={{ mr: 1 }} />
          Save Workout
        </Fab>
      )}

      <Dialog
        open={exerciseDialogOpen}
        onClose={() => setExerciseDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Exercise</DialogTitle>
        <DialogContent>
          <ExerciseLibrary onSelect={handleAddExercise} selectionMode />
        </DialogContent>
      </Dialog>
    </Box>
  )
}
