import { useMemo, useState } from 'react'
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { useWorkouts } from '../../hooks/useWorkouts'
import { useExercises } from '../../hooks/useExercises'

interface Props {
  exerciseId: string
}

export function ProgressChart({ exerciseId }: Props) {
  const { workouts } = useWorkouts()
  const { getExercise } = useExercises()
  const [repFilter, setRepFilter] = useState<number | 'all'>('all')

  const exercise = getExercise(exerciseId)

  const chartData = useMemo(() => {
    const dataPoints: { date: string; maxWeight: number; reps: number }[] = []

    const sortedWorkouts = [...workouts].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    for (const workout of sortedWorkouts) {
      const exerciseLog = workout.exercises.find(e => e.exerciseId === exerciseId)
      if (!exerciseLog) continue

      for (const set of exerciseLog.sets) {
        if (repFilter !== 'all' && set.reps !== repFilter) continue
        dataPoints.push({
          date: new Date(workout.date).toLocaleDateString('sv-SE', {
            month: 'short',
            day: 'numeric',
          }),
          maxWeight: set.weight,
          reps: set.reps,
        })
      }
    }

    // Group by date and take max weight per date
    const grouped = dataPoints.reduce(
      (acc, point) => {
        if (!acc[point.date] || acc[point.date].maxWeight < point.maxWeight) {
          acc[point.date] = point
        }
        return acc
      },
      {} as Record<string, (typeof dataPoints)[0]>
    )

    return Object.values(grouped)
  }, [workouts, exerciseId, repFilter])

  const availableReps = useMemo(() => {
    const reps = new Set<number>()
    for (const workout of workouts) {
      const exerciseLog = workout.exercises.find(e => e.exerciseId === exerciseId)
      if (!exerciseLog) continue
      for (const set of exerciseLog.sets) {
        reps.add(set.reps)
      }
    }
    return [...reps].sort((a, b) => a - b)
  }, [workouts, exerciseId])

  if (chartData.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="text.secondary">No data for {exercise?.name || 'this exercise'}</Typography>
      </Box>
    )
  }

  return (
    <Box>
      <ToggleButtonGroup
        size="small"
        value={repFilter}
        exclusive
        onChange={(_, val) => val !== null && setRepFilter(val)}
        sx={{ mb: 2 }}
      >
        <ToggleButton value="all">All Reps</ToggleButton>
        {availableReps.map(reps => (
          <ToggleButton key={reps} value={reps}>
            {reps} reps
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize={12} />
          <YAxis domain={['auto', 'auto']} fontSize={12} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="maxWeight"
            stroke="#1976d2"
            strokeWidth={2}
            dot={{ r: 4 }}
            name="Weight (kg)"
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}
