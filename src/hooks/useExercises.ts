import { useMemo } from 'react'
import { Exercise } from '../types'
import { defaultExercises } from '../data/defaultExercises'

export function useExercises() {
  const exercises = defaultExercises

  const exerciseMap = useMemo(() => {
    return new Map(exercises.map(e => [e.id, e]))
  }, [exercises])

  const getExercise = (id: string): Exercise | undefined => {
    return exerciseMap.get(id)
  }

  const muscleGroups = useMemo(() => {
    return [...new Set(exercises.map(e => e.muscleGroup))].sort()
  }, [exercises])

  const categories = useMemo(() => {
    return [...new Set(exercises.map(e => e.category))]
  }, [exercises])

  const filterExercises = (search: string, category?: string, muscleGroup?: string): Exercise[] => {
    return exercises.filter(e => {
      const matchesSearch = !search || e.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = !category || e.category === category
      const matchesMuscle = !muscleGroup || e.muscleGroup === muscleGroup
      return matchesSearch && matchesCategory && matchesMuscle
    })
  }

  return {
    exercises,
    getExercise,
    muscleGroups,
    categories,
    filterExercises,
  }
}
