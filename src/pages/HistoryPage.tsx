import { useState } from 'react'
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material'
import { PageAppBar } from '../components/Layout/PageAppBar'
import { WorkoutHistory } from '../components/Workout/WorkoutHistory'
import { useWorkoutTemplates } from '../hooks/useWorkoutTemplates'
import { useExercises } from '../hooks/useExercises'
import { Workout } from '../types'

export function HistoryPage() {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [templateName, setTemplateName] = useState('')
  const [workoutToSave, setWorkoutToSave] = useState<Workout | null>(null)

  const { createTemplateFromWorkout } = useWorkoutTemplates()
  const { getExercise } = useExercises()

  const handleSaveAsTemplate = (workout: Workout) => {
    setWorkoutToSave(workout)
    setTemplateName('')
    setSaveDialogOpen(true)
  }

  const handleConfirmSave = () => {
    if (!workoutToSave || !templateName.trim()) return
    const description = workoutToSave.exercises
      .map(e => getExercise(e.exerciseId)?.name || 'Unknown')
      .join(', ')
    createTemplateFromWorkout(templateName.trim(), description, workoutToSave.exercises)
    setSaveDialogOpen(false)
    setWorkoutToSave(null)
    setTemplateName('')
  }

  return (
    <Box>
      <PageAppBar title="Workout History" />
      <Box sx={{ p: 2 }}>
        <WorkoutHistory onSaveAsTemplate={handleSaveAsTemplate} />
      </Box>

      <Dialog
        open={saveDialogOpen}
        onClose={() => setSaveDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Save as Template</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Template Name"
            value={templateName}
            onChange={e => setTemplateName(e.target.value)}
            sx={{ mt: 1 }}
          />
          {workoutToSave && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Exercises: {workoutToSave.exercises.map(e => getExercise(e.exerciseId)?.name || 'Unknown').join(', ')}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmSave} variant="contained" disabled={!templateName.trim()}>
            Save Template
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
