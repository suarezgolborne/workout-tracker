import { Box, IconButton, TextField, Typography } from '@mui/material'
import { Add, Remove, Delete } from '@mui/icons-material'
import { WorkoutSet } from '../../types'

interface Props {
  set: WorkoutSet
  index: number
  isLast?: boolean
  previousWeight?: number
  onChange: (set: WorkoutSet) => void
  onDelete: () => void
}

export function SetInput({ set, index, isLast, previousWeight, onChange, onDelete }: Props) {
  const adjustValue = (field: 'reps' | 'weight', delta: number) => {
    const newValue = Math.max(0, set[field] + delta)
    onChange({ ...set, [field]: newValue })
  }

  return (
    <Box sx={{ py: 1.5, borderBottom: isLast ? 'none' : '1px solid', borderColor: 'divider' }}>
      {/* Set header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography
          variant="caption"
          sx={{ fontWeight: 700, color: 'secondary.main', textTransform: 'uppercase', letterSpacing: 1 }}
        >
          Set {index + 1}
        </Typography>
        <IconButton size="small" color="error" onClick={onDelete} sx={{ p: 0.25 }}>
          <Delete fontSize="small" />
        </IconButton>
      </Box>

      {/* Reps and Weight */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Reps */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5, display: 'block' }}>
            Reps
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={() => adjustValue('reps', -1)}
              size="small"
              sx={{ bgcolor: 'grey.100', width: 32, height: 32 }}
            >
              <Remove fontSize="small" />
            </IconButton>
            <TextField
              value={set.reps}
              onChange={e => onChange({ ...set, reps: Math.max(0, parseInt(e.target.value) || 0) })}
              size="small"
              type="number"
              inputProps={{
                min: 0,
                style: { textAlign: 'center', fontWeight: 700, fontSize: '1.25rem', padding: '6px 4px' }
              }}
              sx={{ flex: 1, minWidth: 50 }}
            />
            <IconButton
              onClick={() => adjustValue('reps', 1)}
              size="small"
              sx={{ bgcolor: 'grey.100', width: 32, height: 32 }}
            >
              <Add fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Weight */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5, display: 'block' }}>
            Weight (kg)
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={() => adjustValue('weight', -2.5)}
              size="small"
              sx={{ bgcolor: 'grey.100', width: 32, height: 32 }}
            >
              <Remove fontSize="small" />
            </IconButton>
            <TextField
              value={set.weight}
              onChange={e => onChange({ ...set, weight: Math.max(0, parseFloat(e.target.value) || 0) })}
              size="small"
              type="number"
              inputProps={{
                min: 0,
                step: 2.5,
                style: { textAlign: 'center', fontWeight: 700, fontSize: '1.25rem', padding: '6px 4px' }
              }}
              sx={{ flex: 1, minWidth: 50 }}
            />
            <IconButton
              onClick={() => adjustValue('weight', 2.5)}
              size="small"
              sx={{ bgcolor: 'grey.100', width: 32, height: 32 }}
            >
              <Add fontSize="small" />
            </IconButton>
          </Box>
          {previousWeight !== undefined && previousWeight !== set.weight && (
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.7rem', mt: 0.5, display: 'block' }}>
              Last: {previousWeight}kg
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}
