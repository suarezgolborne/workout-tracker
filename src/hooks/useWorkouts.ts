import { useCallback } from 'react'
import { Workout } from '../types'
import { useLocalStorage } from './useLocalStorage'

export function useWorkouts() {
  const [workouts, setWorkouts] = useLocalStorage<Workout[]>('workouts', [])

  const addWorkout = useCallback((workout: Omit<Workout, 'id'>) => {
    const newWorkout: Workout = {
      ...workout,
      id: crypto.randomUUID(),
    }
    setWorkouts(prev => [newWorkout, ...prev])
    return newWorkout
  }, [setWorkouts])

  const updateWorkout = useCallback((id: string, updates: Partial<Omit<Workout, 'id'>>) => {
    setWorkouts(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w))
  }, [setWorkouts])

  const deleteWorkout = useCallback((id: string) => {
    setWorkouts(prev => prev.filter(w => w.id !== id))
  }, [setWorkouts])

  const getWorkout = useCallback((id: string): Workout | undefined => {
    return workouts.find(w => w.id === id)
  }, [workouts])

  const getWorkoutsByDate = useCallback((date: string): Workout[] => {
    return workouts.filter(w => w.date.startsWith(date))
  }, [workouts])

  return {
    workouts,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    getWorkout,
    getWorkoutsByDate,
  }
}
