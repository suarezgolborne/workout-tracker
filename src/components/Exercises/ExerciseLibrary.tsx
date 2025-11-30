import { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Chip,
  List,
  ListItem,
  ListItemText,
  Typography,
  Stack,
} from "@mui/material";
import { Search, FitnessCenter, AccessibilityNew } from "@mui/icons-material";
import { useExercises } from "../../hooks/useExercises";
import { usePersonalRecords } from "../../hooks/usePersonalRecords";
import { Exercise } from "../../types";

interface Props {
  onSelect?: (exercise: Exercise) => void;
  selectionMode?: boolean;
}

const categoryLabels: Record<string, string> = {
  machine: "Machines",
  free_weight: "Free Weights",
  bodyweight: "Bodyweight",
};

export function ExerciseLibrary({ onSelect, selectionMode = false }: Props) {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);

  const { exercises, categories, muscleGroups } = useExercises();
  const { getRecord } = usePersonalRecords();

  // Filter with multi-select support
  const filtered = exercises.filter((exercise) => {
    const matchesSearch =
      !search || exercise.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(exercise.category);
    const matchesMuscle =
      selectedMuscles.length === 0 ||
      selectedMuscles.includes(exercise.muscleGroup);
    return matchesSearch && matchesCategory && matchesMuscle;
  });

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleMuscle = (muscle: string) => {
    setSelectedMuscles((prev) =>
      prev.includes(muscle)
        ? prev.filter((m) => m !== muscle)
        : [...prev, muscle]
    );
  };

  const formatPR = (exerciseId: string): string | null => {
    const record = getRecord(exerciseId);
    if (!record) return null;
    const entries = Object.entries(record.records);
    if (entries.length === 0) return null;
    const [reps, weight] = entries.reduce((a, b) => (b[1] > a[1] ? b : a));
    return `PR: ${weight}kg x ${reps}`;
  };

  return (
    <Box sx={{ pb: 2 }}>
      <TextField
        fullWidth
        placeholder="Search exercises..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      {/* Type Filter */}
      <Box sx={{ mt: 1, mb: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{ mb: 0.5 }}
        >
          <FitnessCenter sx={{ fontSize: 14, color: "text.secondary" }} />
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              color: "text.secondary",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              fontSize: "0.65rem",
            }}
          >
            Type
          </Typography>
        </Stack>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.5,
            justifyContent: "flex-start",
          }}
        >
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={categoryLabels[cat] || cat}
              onClick={() => toggleCategory(cat)}
              color={selectedCategories.includes(cat) ? "primary" : "default"}
              size="small"
              variant={selectedCategories.includes(cat) ? "filled" : "outlined"}
            />
          ))}
        </Box>
      </Box>

      {/* Muscle Group Filter */}
      <Box sx={{ mt: 2, mb: 3 }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{ mb: 0.5 }}
        >
          <AccessibilityNew sx={{ fontSize: 14, color: "text.secondary" }} />
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              color: "text.secondary",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              fontSize: "0.65rem",
            }}
          >
            Muscle Group
          </Typography>
        </Stack>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.5,
            justifyContent: "flex-start",
          }}
        >
          {muscleGroups.map((muscle) => (
            <Chip
              key={muscle}
              label={muscle}
              onClick={() => toggleMuscle(muscle)}
              color={selectedMuscles.includes(muscle) ? "secondary" : "default"}
              size="small"
              variant={selectedMuscles.includes(muscle) ? "filled" : "outlined"}
            />
          ))}
        </Box>
      </Box>

      {/* Results count */}
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mb: 1 }}
      >
        {filtered.length} exercise{filtered.length !== 1 ? "s" : ""}
      </Typography>

      <List disablePadding>
        {filtered.map((exercise) => {
          const pr = formatPR(exercise.id);
          return (
            <ListItem
              key={exercise.id}
              onClick={() => onSelect?.(exercise)}
              sx={{
                cursor: selectionMode ? "pointer" : "default",
                "&:hover": selectionMode ? { bgcolor: "action.hover" } : {},
                borderRadius: 1,
                py: 1.5,
              }}
              divider
            >
              {/* Pictogram on the left */}
              {exercise.pictogram && (
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    mr: 2,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "background.paper",
                  }}
                >
                  <Box
                    component="img"
                    src={exercise.pictogram}
                    alt={exercise.name}
                    sx={{
                      width: 40,
                      height: 40,
                      objectFit: "contain",
                      filter: (theme) =>
                        theme.palette.mode === "dark" ? "invert(1)" : "none",
                    }}
                  />
                </Box>
              )}
              <ListItemText
                primary={
                  <Typography variant="body1" fontWeight={600}>
                    {exercise.name}
                  </Typography>
                }
                secondary={
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mt: 0.5 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {exercise.muscleGroup}
                    </Typography>
                    {pr && (
                      <Typography
                        variant="caption"
                        color="secondary.main"
                        fontWeight="bold"
                      >
                        {pr}
                      </Typography>
                    )}
                  </Stack>
                }
              />
            </ListItem>
          );
        })}
      </List>

      {filtered.length === 0 && (
        <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
          No exercises found
        </Typography>
      )}
    </Box>
  );
}
