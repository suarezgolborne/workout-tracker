import { useState } from 'react'
import {
  Box,
  TextField,
  InputAdornment,
  Chip,
  List,
  ListItem,
  ListItemText,
  Typography,
  Stack,
} from '@mui/material'
import { Search } from '@mui/icons-material'
import { useExercises } from '../../hooks/useExercises'
import { usePersonalRecords } from '../../hooks/usePersonalRecords'
import { Exercise } from '../../types'

interface Props {
  onSelect?: (exercise: Exercise) => void
  selectionMode?: boolean
}

const categoryLabels: Record<string, string> = {
  machine: 'Machines',
  free_weight: 'Free Weights',
  bodyweight: 'Bodyweight',
}

export function ExerciseLibrary({ onSelect, selectionMode = false }: Props) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
  const [selectedMuscle, setSelectedMuscle] = useState<string | undefined>()

  const { filterExercises, categories, muscleGroups } = useExercises()
  const { getRecord } = usePersonalRecords()

  const filtered = filterExercises(search, selectedCategory, selectedMuscle)

  const formatPR = (exerciseId: string): string | null => {
    const record = getRecord(exerciseId)
    if (!record) return null
    const entries = Object.entries(record.records)
    if (entries.length === 0) return null
    const [reps, weight] = entries.reduce((a, b) => (b[1] > a[1] ? b : a))
    return `PR: ${weight}kg x ${reps}`
  }

  return (
    <Box sx={{ pb: 2 }}>
      <TextField
        fullWidth
        placeholder="Search exercises..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        size="small"
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap', gap: 1 }}>
        {categories.map(cat => (
          <Chip
            key={cat}
            label={categoryLabels[cat] || cat}
            onClick={() => setSelectedCategory(selectedCategory === cat ? undefined : cat)}
            color={selectedCategory === cat ? 'primary' : 'default'}
            size="small"
          />
        ))}
      </Stack>

      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
        {muscleGroups.map(muscle => (
          <Chip
            key={muscle}
            label={muscle}
            onClick={() => setSelectedMuscle(selectedMuscle === muscle ? undefined : muscle)}
            color={selectedMuscle === muscle ? 'secondary' : 'default'}
            size="small"
            variant="outlined"
          />
        ))}
      </Stack>

      <List disablePadding>
        {filtered.map(exercise => {
          const pr = formatPR(exercise.id)
          return (
            <ListItem
              key={exercise.id}
              onClick={() => onSelect?.(exercise)}
              sx={{
                cursor: selectionMode ? 'pointer' : 'default',
                '&:hover': selectionMode ? { bgcolor: 'action.hover' } : {},
                borderRadius: 1,
              }}
              divider
            >
              <ListItemText
                primary={exercise.name}
                secondary={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="caption" color="text.secondary">
                      {exercise.muscleGroup}
                    </Typography>
                    {pr && (
                      <Typography variant="caption" color="secondary" fontWeight="bold">
                        {pr}
                      </Typography>
                    )}
                  </Stack>
                }
              />
            </ListItem>
          )
        })}
      </List>

      {filtered.length === 0 && (
        <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
          No exercises found
        </Typography>
      )}
    </Box>
  )
}
