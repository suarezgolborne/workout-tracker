# Workout Tracker

A React-based workout tracking application for logging exercises, tracking sets/reps/weights, and monitoring personal records.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **UI Library**: Material UI (MUI) v6
- **Routing**: React Router v6
- **Charts**: Recharts
- **State**: Custom hooks with localStorage persistence

## Project Structure

```
src/
├── components/       # Reusable UI components organized by feature
│   ├── Layout/       # App shell components (navigation)
│   ├── Exercises/    # Exercise library components
│   ├── Workout/      # Workout logging components
│   └── Progress/     # Progress tracking and charts
├── pages/            # Route-level page components
├── hooks/            # Custom React hooks for state management
├── data/             # Static data (default exercises)
├── types.ts          # TypeScript type definitions
├── theme.ts          # MUI theme configuration
├── App.tsx           # Root component with routing
└── main.tsx          # Application entry point
```

## Commands

```bash
npm run dev      # Start development server
npm run build    # Type check and build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Code Conventions

### TypeScript
- Strict mode enabled
- Use explicit types for function parameters and return values
- Define shared types in `src/types.ts`
- Use interfaces for object shapes, type aliases for unions/primitives

### React Components
- Use functional components with hooks
- Named exports for components (e.g., `export const ComponentName`)
- Default export only for App.tsx
- Co-locate component-specific logic in the component file

### Styling
- Use MUI's `sx` prop for component styling
- Theme customizations go in `src/theme.ts`
- No separate CSS files - use MUI's styling system

### State Management
- Custom hooks in `src/hooks/` for domain logic
- localStorage for data persistence via `useLocalStorage` hook
- No external state management library

### File Naming
- Components: PascalCase (e.g., `WorkoutPage.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useWorkouts.ts`)
- Types/utils: camelCase (e.g., `types.ts`)

## Domain Types

- **Exercise**: Predefined exercise with category and muscle group
- **WorkoutSet**: Single set with reps and weight
- **ExerciseLog**: Collection of sets for an exercise in a workout
- **Workout**: Complete workout session with date, exercise logs, and timing (startTime/endTime)
- **PersonalRecord**: Best weights achieved per rep count
- **WorkoutTemplate**: Saved workout structure for quick start (name, exercises with defaults)
- **TemplateExercise**: Exercise in a template with default sets, reps, and weight

## Routes

- `/` - Active workout logging
- `/history` - Past workout history
- `/exercises` - Exercise library management
- `/progress` - Progress charts and PR dashboard
