import { useCallback, useMemo } from 'react'
import { PersonalRecord, Workout } from '../types'
import { useLocalStorage } from './useLocalStorage'

export function usePersonalRecords() {
  const [records, setRecords] = useLocalStorage<PersonalRecord[]>('personalRecords', [])

  const recordsMap = useMemo(() => {
    return new Map(records.map(r => [r.exerciseId, r]))
  }, [records])

  const getRecord = useCallback((exerciseId: string): PersonalRecord | undefined => {
    return recordsMap.get(exerciseId)
  }, [recordsMap])

  const getMaxWeight = useCallback((exerciseId: string, reps: number): number | undefined => {
    const record = recordsMap.get(exerciseId)
    return record?.records[reps]
  }, [recordsMap])

  const updateRecordsFromWorkout = useCallback((workout: Workout) => {
    setRecords(prev => {
      const updated = [...prev]
      const now = new Date().toISOString()

      for (const exerciseLog of workout.exercises) {
        const existingIndex = updated.findIndex(r => r.exerciseId === exerciseLog.exerciseId)
        const existing = existingIndex >= 0 ? { ...updated[existingIndex] } : {
          exerciseId: exerciseLog.exerciseId,
          records: {},
          updatedAt: now,
        }

        let changed = false
        for (const set of exerciseLog.sets) {
          const currentMax = existing.records[set.reps] || 0
          if (set.weight > currentMax) {
            existing.records = { ...existing.records, [set.reps]: set.weight }
            existing.updatedAt = now
            changed = true
          }
        }

        if (changed) {
          if (existingIndex >= 0) {
            updated[existingIndex] = existing
          } else {
            updated.push(existing)
          }
        }
      }

      return updated
    })
  }, [setRecords])

  return {
    records,
    getRecord,
    getMaxWeight,
    updateRecordsFromWorkout,
  }
}
