import { useCallback } from 'react'
import { WorkoutTemplate, TemplateExercise, ExerciseLog } from '../types'
import { useLocalStorage } from './useLocalStorage'

export function useWorkoutTemplates() {
  const [templates, setTemplates] = useLocalStorage<WorkoutTemplate[]>('workout-templates', [])

  const addTemplate = useCallback((name: string, description: string, exercises: TemplateExercise[]) => {
    const newTemplate: WorkoutTemplate = {
      id: crypto.randomUUID(),
      name,
      description,
      exercises,
      createdAt: new Date().toISOString(),
    }
    setTemplates(prev => [newTemplate, ...prev])
    return newTemplate
  }, [setTemplates])

  const createTemplateFromWorkout = useCallback((name: string, description: string, exerciseLogs: ExerciseLog[]) => {
    const templateExercises: TemplateExercise[] = exerciseLogs.map(log => {
      const avgReps = log.sets.length > 0
        ? Math.round(log.sets.reduce((sum, s) => sum + s.reps, 0) / log.sets.length)
        : 10
      const avgWeight = log.sets.length > 0
        ? Math.round(log.sets.reduce((sum, s) => sum + s.weight, 0) / log.sets.length)
        : 0
      return {
        exerciseId: log.exerciseId,
        defaultSets: log.sets.length,
        defaultReps: avgReps,
        defaultWeight: avgWeight,
      }
    })
    return addTemplate(name, description, templateExercises)
  }, [addTemplate])

  const deleteTemplate = useCallback((id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id))
  }, [setTemplates])

  const updateTemplate = useCallback((id: string, updates: Partial<Omit<WorkoutTemplate, 'id' | 'createdAt'>>) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t))
  }, [setTemplates])

  const getTemplate = useCallback((id: string): WorkoutTemplate | undefined => {
    return templates.find(t => t.id === id)
  }, [templates])

  const templateToExerciseLogs = useCallback((template: WorkoutTemplate): ExerciseLog[] => {
    return template.exercises.map(te => ({
      exerciseId: te.exerciseId,
      sets: Array.from({ length: te.defaultSets }, () => ({
        reps: te.defaultReps,
        weight: te.defaultWeight,
      })),
    }))
  }, [])

  return {
    templates,
    addTemplate,
    createTemplateFromWorkout,
    deleteTemplate,
    updateTemplate,
    getTemplate,
    templateToExerciseLogs,
  }
}
