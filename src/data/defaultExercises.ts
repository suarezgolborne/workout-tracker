import { Exercise } from '../types'

export const defaultExercises: Exercise[] = [
  // Fitness24Seven Machines
  { id: 'machine-ab-crunch', name: 'Ab Crunch', category: 'machine', muscleGroup: 'Core' },
  { id: 'machine-abduction-adduction', name: 'Abduction/Adduction', category: 'machine', muscleGroup: 'Legs' },
  { id: 'machine-abdominal', name: 'Abdominal', category: 'machine', muscleGroup: 'Core' },
  { id: 'machine-angled-leg-press', name: 'Angled Leg Press', category: 'machine', muscleGroup: 'Legs' },
  { id: 'machine-biceps-curl', name: 'Biceps Curl', category: 'machine', muscleGroup: 'Arms' },
  { id: 'machine-bilateral-arm-curl', name: 'Bilateral Arm Curl', category: 'machine', muscleGroup: 'Arms' },
  { id: 'machine-chest-press', name: 'Chest Press', category: 'machine', muscleGroup: 'Chest' },
  { id: 'machine-deltoid-raise', name: 'Deltoid Raise', category: 'machine', muscleGroup: 'Shoulders' },
  { id: 'machine-hip-thrust', name: 'Hip Thrust', category: 'machine', muscleGroup: 'Glutes' },
  { id: 'machine-lat-pull-down', name: 'Lat Pull Down', category: 'machine', muscleGroup: 'Back' },
  { id: 'machine-leg-curl-laying', name: 'Leg Curl (Laying)', category: 'machine', muscleGroup: 'Legs' },
  { id: 'machine-leg-curl-sitting', name: 'Leg Curl (Sitting)', category: 'machine', muscleGroup: 'Legs' },
  { id: 'machine-leg-extension', name: 'Leg Extension', category: 'machine', muscleGroup: 'Legs' },
  { id: 'machine-low-back', name: 'Low Back', category: 'machine', muscleGroup: 'Back' },
  { id: 'machine-pec-fly', name: 'Pec Fly', category: 'machine', muscleGroup: 'Chest' },
  { id: 'machine-rear-deltoid', name: 'Rear Deltoid', category: 'machine', muscleGroup: 'Shoulders' },
  { id: 'machine-rotary-torso', name: 'Rotary Torso', category: 'machine', muscleGroup: 'Core' },
  { id: 'machine-row', name: 'Row', category: 'machine', muscleGroup: 'Back' },
  { id: 'machine-shoulder-press', name: 'Shoulder Press', category: 'machine', muscleGroup: 'Shoulders' },
  { id: 'machine-standing-calf', name: 'Standing Calf', category: 'machine', muscleGroup: 'Legs' },
  { id: 'machine-triceps-press', name: 'Triceps Press', category: 'machine', muscleGroup: 'Arms' },
  { id: 'machine-triceps-extension', name: 'Triceps Extension', category: 'machine', muscleGroup: 'Arms' },

  // Common Free Weights
  { id: 'free-barbell-bench-press', name: 'Barbell Bench Press', category: 'free_weight', muscleGroup: 'Chest' },
  { id: 'free-barbell-squat', name: 'Barbell Squat', category: 'free_weight', muscleGroup: 'Legs' },
  { id: 'free-deadlift', name: 'Deadlift', category: 'free_weight', muscleGroup: 'Back' },
  { id: 'free-overhead-press', name: 'Overhead Press', category: 'free_weight', muscleGroup: 'Shoulders' },
  { id: 'free-barbell-row', name: 'Barbell Row', category: 'free_weight', muscleGroup: 'Back' },
  { id: 'free-dumbbell-curl', name: 'Dumbbell Curl', category: 'free_weight', muscleGroup: 'Arms' },
  { id: 'free-dumbbell-shoulder-press', name: 'Dumbbell Shoulder Press', category: 'free_weight', muscleGroup: 'Shoulders' },
  { id: 'free-dumbbell-bench-press', name: 'Dumbbell Bench Press', category: 'free_weight', muscleGroup: 'Chest' },
  { id: 'free-dumbbell-row', name: 'Dumbbell Row', category: 'free_weight', muscleGroup: 'Back' },
  { id: 'free-lunges', name: 'Lunges', category: 'free_weight', muscleGroup: 'Legs' },
  { id: 'free-romanian-deadlift', name: 'Romanian Deadlift', category: 'free_weight', muscleGroup: 'Legs' },
  { id: 'free-face-pulls', name: 'Face Pulls', category: 'free_weight', muscleGroup: 'Shoulders' },
  { id: 'free-lateral-raises', name: 'Lateral Raises', category: 'free_weight', muscleGroup: 'Shoulders' },

  // Bodyweight
  { id: 'bw-pull-ups', name: 'Pull-ups', category: 'bodyweight', muscleGroup: 'Back' },
  { id: 'bw-dips', name: 'Dips', category: 'bodyweight', muscleGroup: 'Chest' },
]
