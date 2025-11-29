import { Box, Button, Typography, IconButton, Collapse, Paper } from '@mui/material'
import { Add, Delete, ExpandMore, ExpandLess } from '@mui/icons-material'
import { useState } from 'react'
import { ExerciseLog, WorkoutSet, Exercise } from '../../types'
import { SetInput } from './SetInput'
import { usePersonalRecords } from '../../hooks/usePersonalRecords'

interface Props {
  exercise: Exercise
  log: ExerciseLog
  onChange: (log: ExerciseLog) => void
  onDelete: () => void
}

export function ExerciseEntry({ exercise, log, onChange, onDelete }: Props) {
  const [expanded, setExpanded] = useState(true)
  const { getMaxWeight } = usePersonalRecords()

  const addSet = () => {
    const lastSet = log.sets[log.sets.length - 1]
    const newSet: WorkoutSet = lastSet
      ? { ...lastSet }
      : { reps: 10, weight: 0 }
    onChange({ ...log, sets: [...log.sets, newSet] })
  }

  const updateSet = (index: number, set: WorkoutSet) => {
    const newSets = [...log.sets]
    newSets[index] = set
    onChange({ ...log, sets: newSets })
  }

  const deleteSet = (index: number) => {
    onChange({ ...log, sets: log.sets.filter((_, i) => i !== index) })
  }

  const totalVolume = log.sets.reduce((sum, s) => sum + s.reps * s.weight, 0)

  return (
    <Paper sx={{ mb: 2, overflow: 'hidden' }}>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          cursor: 'pointer',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
          <Typography variant="subtitle1" fontWeight="bold" noWrap>
            {exercise.name}
          </Typography>
          <Typography variant="caption" noWrap component="div">
            {log.sets.length} sets · {totalVolume}kg volume
          </Typography>
        </Box>
        <IconButton
          size="small"
          sx={{ color: 'inherit', mr: 1 }}
          onClick={e => {
            e.stopPropagation()
            onDelete()
          }}
        >
          <Delete />
        </IconButton>
        {expanded ? <ExpandLess /> : <ExpandMore />}
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ p: 2 }}>
          {log.sets.map((set, index) => (
            <SetInput
              key={index}
              set={set}
              index={index}
              previousWeight={getMaxWeight(exercise.id, set.reps)}
              onChange={s => updateSet(index, s)}
              onDelete={() => deleteSet(index)}
            />
          ))}

          <Button startIcon={<Add />} onClick={addSet} variant="outlined" fullWidth sx={{ mt: 1 }}>
            Add Set
          </Button>
        </Box>
      </Collapse>
    </Paper>
  )
}
