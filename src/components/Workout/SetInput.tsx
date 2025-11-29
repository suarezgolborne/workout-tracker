import { Box, IconButton, TextField, Typography, Stack, Paper } from '@mui/material'
import { Add, Remove, Delete } from '@mui/icons-material'
import { WorkoutSet } from '../../types'

interface Props {
  set: WorkoutSet
  index: number
  previousWeight?: number
  onChange: (set: WorkoutSet) => void
  onDelete: () => void
}

export function SetInput({ set, index, previousWeight, onChange, onDelete }: Props) {
  const adjustValue = (field: 'reps' | 'weight', delta: number) => {
    const newValue = Math.max(0, set[field] + delta)
    onChange({ ...set, [field]: newValue })
  }

  return (
    <Paper variant="outlined" sx={{ p: 1.5, mb: 1 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="body2" color="text.secondary" sx={{ minWidth: 40 }}>
          Set {index + 1}
        </Typography>

        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Reps
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <IconButton size="small" onClick={() => adjustValue('reps', -1)}>
              <Remove fontSize="small" />
            </IconButton>
            <TextField
              value={set.reps}
              onChange={e => onChange({ ...set, reps: Math.max(0, parseInt(e.target.value) || 0) })}
              size="small"
              type="number"
              inputProps={{ min: 0, style: { textAlign: 'center', width: 50 } }}
            />
            <IconButton size="small" onClick={() => adjustValue('reps', 1)}>
              <Add fontSize="small" />
            </IconButton>
          </Stack>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Weight (kg)
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <IconButton size="small" onClick={() => adjustValue('weight', -2.5)}>
              <Remove fontSize="small" />
            </IconButton>
            <TextField
              value={set.weight}
              onChange={e => onChange({ ...set, weight: Math.max(0, parseFloat(e.target.value) || 0) })}
              size="small"
              type="number"
              inputProps={{ min: 0, step: 2.5, style: { textAlign: 'center', width: 60 } }}
            />
            <IconButton size="small" onClick={() => adjustValue('weight', 2.5)}>
              <Add fontSize="small" />
            </IconButton>
          </Stack>
          {previousWeight && previousWeight !== set.weight && (
            <Typography variant="caption" color="text.secondary">
              Last: {previousWeight}kg
            </Typography>
          )}
        </Box>

        <IconButton size="small" color="error" onClick={onDelete}>
          <Delete fontSize="small" />
        </IconButton>
      </Stack>
    </Paper>
  )
}
