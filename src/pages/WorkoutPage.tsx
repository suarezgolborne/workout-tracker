import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
  Stack,
} from "@mui/material";
import {
  Add,
  Save,
  Close,
  PlayArrow,
  BookmarkAdd,
  Delete,
  Edit,
  IosShare,
} from "@mui/icons-material";
import { PageAppBar } from "../components/Layout/PageAppBar";
import { ExerciseLibrary } from "../components/Exercises/ExerciseLibrary";
import { ExerciseEntry } from "../components/Workout/ExerciseEntry";
import { useWorkouts } from "../hooks/useWorkouts";
import { useExercises } from "../hooks/useExercises";
import { usePersonalRecords } from "../hooks/usePersonalRecords";
import { useWorkoutTemplates } from "../hooks/useWorkoutTemplates";
import { ExerciseLog, Exercise, Workout, WorkoutTemplate } from "../types";

const getDefaultTimes = () => {
  const now = new Date();
  // Convert to CET (Europe/Stockholm)
  const cetTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Europe/Stockholm" })
  );
  const lastFullHour = new Date(cetTime);
  lastFullHour.setMinutes(0, 0, 0);

  const startHour = lastFullHour.getHours().toString().padStart(2, "0");
  const endHour = ((lastFullHour.getHours() + 1) % 24)
    .toString()
    .padStart(2, "0");

  return {
    date: now.toISOString().split("T")[0],
    start: `${startHour}:00`,
    end: `${endHour}:00`,
  };
};

export function WorkoutPage() {
  const [activeWorkout, setActiveWorkout] = useState<ExerciseLog[]>([]);
  const [exerciseDialogOpen, setExerciseDialogOpen] = useState(false);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [saveTemplateDialogOpen, setSaveTemplateDialogOpen] = useState(false);
  const [editTemplateDialogOpen, setEditTemplateDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] =
    useState<WorkoutTemplate | null>(null);
  const [templateName, setTemplateName] = useState("");
  const [notes, setNotes] = useState("");
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workoutDate, setWorkoutDate] = useState(() => getDefaultTimes().date);
  const [startTime, setStartTime] = useState(() => getDefaultTimes().start);
  const [endTime, setEndTime] = useState(() => getDefaultTimes().end);

  const { addWorkout } = useWorkouts();
  const { getExercise } = useExercises();
  const { updateRecordsFromWorkout } = usePersonalRecords();
  const {
    templates,
    createTemplateFromWorkout,
    templateToExerciseLogs,
    deleteTemplate,
    updateTemplate,
  } = useWorkoutTemplates();

  const getExerciseDescription = (exerciseLogs: ExerciseLog[]): string => {
    return exerciseLogs
      .map((log) => getExercise(log.exerciseId)?.name || "Unknown")
      .join(", ");
  };

  const handleAddExercise = (exercise: Exercise) => {
    if (activeWorkout.some((e) => e.exerciseId === exercise.id)) {
      setExerciseDialogOpen(false);
      return;
    }
    setActiveWorkout((prev) => [
      ...prev,
      { exerciseId: exercise.id, sets: [{ reps: 10, weight: 0 }] },
    ]);
    setExerciseDialogOpen(false);
  };

  const handleUpdateExercise = (index: number, log: ExerciseLog) => {
    setActiveWorkout((prev) => prev.map((e, i) => (i === index ? log : e)));
  };

  const handleDeleteExercise = (index: number) => {
    setActiveWorkout((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveWorkout = () => {
    if (activeWorkout.length === 0) return;

    const startDateTime = new Date(`${workoutDate}T${startTime}`).toISOString();
    const endDateTime = new Date(`${workoutDate}T${endTime}`).toISOString();

    const workout: Omit<Workout, "id"> = {
      date: new Date(workoutDate).toISOString(),
      exercises: activeWorkout.filter((e) => e.sets.length > 0),
      notes: notes || undefined,
      startTime: startDateTime,
      endTime: endDateTime,
    };

    const saved = addWorkout(workout);
    updateRecordsFromWorkout(saved);

    setActiveWorkout([]);
    setNotes("");
    setWorkoutStarted(false);
    const defaults = getDefaultTimes();
    setWorkoutDate(defaults.date);
    setStartTime(defaults.start);
    setEndTime(defaults.end);
  };

  const handleStartWorkout = (template?: WorkoutTemplate) => {
    setWorkoutStarted(true);
    if (template) {
      setActiveWorkout(templateToExerciseLogs(template));
    }
    setTemplateDialogOpen(false);
  };

  const handleCancelWorkout = () => {
    setActiveWorkout([]);
    setNotes("");
    setWorkoutStarted(false);
    const defaults = getDefaultTimes();
    setWorkoutDate(defaults.date);
    setStartTime(defaults.start);
    setEndTime(defaults.end);
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim() || activeWorkout.length === 0) return;
    const description = getExerciseDescription(activeWorkout);
    createTemplateFromWorkout(templateName.trim(), description, activeWorkout);
    setTemplateName("");
    setSaveTemplateDialogOpen(false);
  };

  const handleEditTemplate = (template: WorkoutTemplate) => {
    setEditingTemplate(template);
    setTemplateName(template.name);
    setEditTemplateDialogOpen(true);
  };

  const handleSaveEditedTemplate = () => {
    if (!editingTemplate || !templateName.trim()) return;
    const description = editingTemplate.exercises
      .map((te) => getExercise(te.exerciseId)?.name || "Unknown")
      .join(", ");
    updateTemplate(editingTemplate.id, {
      name: templateName.trim(),
      description,
    });
    setEditingTemplate(null);
    setTemplateName("");
    setEditTemplateDialogOpen(false);
  };

  const handleAddToHomeScreen = async () => {
    const shareData = {
      title: "Workout Tracker",
      text: "Add Workout Tracker to your home screen for fast logging.",
      url: window.location.href,
    };

    if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if ((error as DOMException).name === "AbortError") return;
      }
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(window.location.href);
      window.alert("Link copied! Use your browser's Add to Home Screen option.");
      return;
    }

    window.alert("Sharing is not supported on this device. Copy the link to pin it.");
  };

  if (!workoutStarted) {
    return (
      <Box sx={{ textAlign: "center", pt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Ready to workout?
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Start a new session to log your exercises
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => handleStartWorkout()}
            startIcon={<PlayArrow />}
          >
            Start new workout
          </Button>
          {templates.length > 0 && (
            <Button
              variant="outlined"
              size="large"
              onClick={() => setTemplateDialogOpen(true)}
              startIcon={<Add />}
            >
              Use workout template
            </Button>
          )}
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => void handleAddToHomeScreen()}
            startIcon={<IosShare />}
            sx={{
              width: "100%",
              maxWidth: 360,
              border: (theme) => `3px solid ${theme.palette.text.primary}`,
              borderRadius: 3,
              fontWeight: 900,
              letterSpacing: 1,
              textTransform: "uppercase",
              boxShadow: (theme) =>
                `6px 6px 0 ${theme.palette.background.paper}, 10px 10px 0 ${theme.palette.text.primary}`,
              transform: "skew(-2deg)",
              transition: "all 120ms ease",
              bgcolor: (theme) => theme.palette.secondary.main,
              color: (theme) => theme.palette.secondary.contrastText,
              "&:hover": {
                bgcolor: (theme) => theme.palette.secondary.dark,
                boxShadow: (theme) =>
                  `4px 4px 0 ${theme.palette.background.paper}, 8px 8px 0 ${theme.palette.text.primary}`,
                transform: "skew(0deg) scale(0.99)",
              },
            }}
          >
            Add to Home Screen
          </Button>
        </Box>

        <Dialog
          open={templateDialogOpen}
          onClose={() => setTemplateDialogOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Select Template</DialogTitle>
          <DialogContent>
            <List>
              {templates.map((template) => (
                <ListItemButton
                  key={template.id}
                  onClick={() => handleStartWorkout(template)}
                >
                  <ListItemText
                    primary={template.name}
                    secondary={
                      template.description ||
                      `${template.exercises.length} exercises`
                    }
                  />
                  <ListItemSecondaryAction>
                    <Stack direction="row" spacing={0.5}>
                      <IconButton
                        edge="end"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditTemplate(template);
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTemplate(template.id);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Stack>
                  </ListItemSecondaryAction>
                </ListItemButton>
              ))}
            </List>
          </DialogContent>
        </Dialog>

        <Dialog
          open={editTemplateDialogOpen}
          onClose={() => setEditTemplateDialogOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit Template</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              fullWidth
              label="Template Name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              sx={{ mt: 1 }}
            />
            {editingTemplate && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Exercises:{" "}
                {editingTemplate.exercises
                  .map((te) => getExercise(te.exerciseId)?.name || "Unknown")
                  .join(", ")}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditTemplateDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveEditedTemplate}
              variant="contained"
              disabled={!templateName.trim()}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 10 }}>
      <PageAppBar
        title="Current Workout"
        actions={
          <IconButton onClick={handleCancelWorkout} color="error">
            <Close />
          </IconButton>
        }
      />

      <Box sx={{ p: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <TextField
          type="date"
          label="Date"
          value={workoutDate}
          onChange={(e) => setWorkoutDate(e.target.value)}
          size="small"
          InputLabelProps={{ shrink: true }}
          sx={{ flex: 1, minWidth: 140 }}
        />
        <TextField
          type="time"
          label="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          size="small"
          InputLabelProps={{ shrink: true }}
          sx={{ flex: 1, minWidth: 110 }}
        />
        <TextField
          type="time"
          label="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          size="small"
          InputLabelProps={{ shrink: true }}
          sx={{ flex: 1, minWidth: 110 }}
        />
      </Box>

      <Box sx={{ p: 2 }}>
        {activeWorkout.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography color="text.secondary">
              No exercises added yet
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => setExerciseDialogOpen(true)}
              sx={{ mt: 2 }}
            >
              Add Exercise
            </Button>
          </Box>
        ) : (
          <>
            {activeWorkout.map((log, index) => {
              const exercise = getExercise(log.exerciseId);
              if (!exercise) return null;
              return (
                <ExerciseEntry
                  key={log.exerciseId}
                  exercise={exercise}
                  log={log}
                  onChange={(l) => handleUpdateExercise(index, l)}
                  onDelete={() => handleDeleteExercise(index)}
                />
              );
            })}

            <Button
              variant="outlined"
              fullWidth
              startIcon={<Add />}
              onClick={() => setExerciseDialogOpen(true)}
              sx={{ mb: 2 }}
            >
              Add Exercise
            </Button>

            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="Workout notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button
              variant="text"
              fullWidth
              startIcon={<BookmarkAdd />}
              onClick={() => setSaveTemplateDialogOpen(true)}
              sx={{ mb: 2 }}
            >
              Save as Template
            </Button>
          </>
        )}
      </Box>

      {activeWorkout.length > 0 && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSaveWorkout}
          startIcon={<Save />}
          sx={{
            position: "fixed",
            bottom: (theme) => `calc(${theme.spacing(12)} + env(safe-area-inset-bottom))`,
            right: 16,
            borderRadius: 100,
            px: 3,
            py: 1.5,
            boxShadow: 3,
          }}
        >
          Save Workout
        </Button>
      )}

      <Dialog
        open={exerciseDialogOpen}
        onClose={() => setExerciseDialogOpen(false)}
        fullWidth
        maxWidth={false}
        PaperProps={{
          sx: (theme) => ({
            width: "calc(100% - 32px)",
            maxWidth: 900,
            mt: `max(${theme.spacing(2)}, env(safe-area-inset-top))`,
            mb: theme.spacing(2),
            maxHeight: "calc(100% - 128px)",
          }),
        }}
        sx={{
          "& .MuiDialog-container": {
            alignItems: "flex-start",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pr: 1,
          }}
        >
          Add Exercise
          <IconButton
            aria-label="Close"
            onClick={() => setExerciseDialogOpen(false)}
            edge="end"
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <ExerciseLibrary onSelect={handleAddExercise} selectionMode />
        </DialogContent>
      </Dialog>

      <Dialog
        open={saveTemplateDialogOpen}
        onClose={() => setSaveTemplateDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Save as Template</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Template Name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            sx={{ mt: 1 }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            This will save the current exercises with their average reps and
            weights as a template.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveTemplateDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveTemplate}
            variant="contained"
            disabled={!templateName.trim()}
          >
            Save Template
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
