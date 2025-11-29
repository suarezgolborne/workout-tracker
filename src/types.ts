export interface Exercise {
  id: string
  name: string
  category: 'machine' | 'free_weight' | 'bodyweight'
  muscleGroup: string
}

export interface WorkoutSet {
  reps: number
  weight: number
}

export interface ExerciseLog {
  exerciseId: string
  sets: WorkoutSet[]
}

export interface Workout {
  id: string
  date: string
  exercises: ExerciseLog[]
  notes?: string
}

export interface PersonalRecord {
  exerciseId: string
  records: Record<number, number> // reps -> max weight
  updatedAt: string
}
