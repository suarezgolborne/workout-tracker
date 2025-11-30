export interface Exercise {
  id: string;
  name: string;
  category: "machine" | "free_weight" | "bodyweight";
  muscleGroup: string;
  pictogram?: string; // Path to pictogram image
}

export interface WorkoutSet {
  reps: number;
  weight: number;
}

export interface ExerciseLog {
  exerciseId: string;
  sets: WorkoutSet[];
}

export interface Workout {
  id: string;
  date: string;
  exercises: ExerciseLog[];
  notes?: string;
  startTime: string;
  endTime?: string;
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  exercises: TemplateExercise[];
  createdAt: string;
}

export interface TemplateExercise {
  exerciseId: string;
  defaultSets: number;
  defaultReps: number;
  defaultWeight: number;
}

export interface PersonalRecord {
  exerciseId: string;
  records: Record<number, number>; // reps -> max weight
  updatedAt: string;
}
