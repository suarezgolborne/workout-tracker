import { useEffect, useState } from "react";
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

interface BeforeInstallPromptEvent extends Event {
  readonly platforms?: string[];
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

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
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installHintOpen, setInstallHintOpen] = useState(false);
  const [showInstallButton, setShowInstallButton] = useState(true);
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<string[]>([]);

  const { addWorkout } = useWorkouts();
  const { getExercise } = useExercises();
  const { updateRecordsFromWorkout, getRecord } = usePersonalRecords();
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

  const getDefaultWeight = (exerciseId: string): number => {
    const record = getRecord(exerciseId);
    if (!record) return 0;

    const weights = Object.values(record.records);
    if (weights.length === 0) return 0;

    return weights.reduce((max, current) => Math.max(max, current), 0);
  };

  const createExerciseLog = (exerciseId: string): ExerciseLog => ({
    exerciseId,
    sets: [{ reps: 10, weight: getDefaultWeight(exerciseId) }],
  });

  const handleAddExercise = (exercise: Exercise) => {
    if (activeWorkout.some((e) => e.exerciseId === exercise.id)) {
      setExerciseDialogOpen(false);
      return;
    }
    setActiveWorkout((prev) => [
      ...prev,
      createExerciseLog(exercise.id),
    ]);
    setExerciseDialogOpen(false);
  };

  const handleToggleExerciseSelection = (exerciseId: string) => {
    setSelectedExerciseIds((prev) =>
      prev.includes(exerciseId)
        ? prev.filter((id) => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  const handleAddSelectedExercises = () => {
    if (selectedExerciseIds.length === 0) return;

    setActiveWorkout((prev) => {
      const newLogs = selectedExerciseIds
        .filter((id) => !prev.some((e) => e.exerciseId === id))
        .map((id) => createExerciseLog(id));

      return [...prev, ...newLogs];
    });

    setSelectedExerciseIds([]);
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

  useEffect(() => {
    const listener = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", listener);

    return () => {
      window.removeEventListener("beforeinstallprompt", listener);
    };
  }, []);

  useEffect(() => {
    const isIosDevice = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isAppleTouchDevice =
        /iphone|ipad|ipod/.test(userAgent) ||
        (userAgent.includes("mac") && "ontouchend" in document);

      return isAppleTouchDevice;
    };

    const isStandalone = () => {
      const isDisplayModeStandalone = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;
      const isNavigatorStandalone =
        typeof (window.navigator as { standalone?: boolean }).standalone ===
          "boolean" &&
        Boolean((window.navigator as { standalone?: boolean }).standalone);

      return isDisplayModeStandalone || isNavigatorStandalone;
    };

    if (isIosDevice() && isStandalone()) {
      setShowInstallButton(false);
    }
  }, []);

  useEffect(() => {
    if (!exerciseDialogOpen) {
      setSelectedExerciseIds([]);
    }
  }, [exerciseDialogOpen]);

  const handleAddToHomeScreen = async () => {
    // Try native install prompt first (Android/desktop Chrome)
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      setDeferredPrompt(null);
      return;
    }

    // Show manual instructions dialog (works for iOS and all platforms)
    setInstallHintOpen(true);
  };

  if (!workoutStarted) {
    return (
      <Box sx={{ textAlign: "center", pt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Ready to jack your body?
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
            sx={{
              width: "100%",
              maxWidth: 360,
            }}
          >
            Start new workout
          </Button>
          {templates.length > 0 && (
            <Button
              variant="outlined"
              size="large"
              onClick={() => setTemplateDialogOpen(true)}
              startIcon={<Add />}
              sx={{
                width: "100%",
                maxWidth: 360,
                borderColor: (theme) => theme.palette.text.primary,
                boxShadow: "3px 3px 0 #1A1C00",
                "&:hover": {
                  borderColor: (theme) => theme.palette.text.primary,
                  boxShadow: "4px 4px 0 #1A1C00",
                },
              }}
            >
              Use workout template
            </Button>
          )}
          {showInstallButton && (
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => void handleAddToHomeScreen()}
              startIcon={<IosShare />}
              sx={{
                width: "100%",
                maxWidth: 360,
                border: (theme) => `2px solid ${theme.palette.text.primary}`,
                borderRadius: 3,
                fontWeight: 900,
                letterSpacing: 1,
                textTransform: "uppercase",
                boxShadow: "3px 3px 0 #1A1C00",
                transform: "skew(-2deg)",
                transition: "all 120ms ease",
                bgcolor: (theme) => theme.palette.secondary.main,
                color: (theme) => theme.palette.secondary.contrastText,
                "&:hover": {
                  bgcolor: (theme) => theme.palette.secondary.dark,
                  boxShadow: "4px 4px 0 #1A1C00",
                  transform: "skew(0deg) scale(0.99)",
                },
              }}
            >
              Add to Home Screen
            </Button>
          )}
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

        <Dialog
          open={installHintOpen}
          onClose={() => setInstallHintOpen(false)}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>Install on your home screen</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 1 }}>
              Save Workout Tracker for quick access:
            </Typography>
            <List sx={{ pl: 2 }}>
              <ListItemText primary="1. Tap the share icon in Safari" />
              <ListItemText primary='2. Choose "Add to Home Screen"' />
              <ListItemText primary="3. Confirm to install" />
            </List>
            <Typography variant="body2" color="text.secondary">
              Tip: On Android, look for the install banner or browser menu
              option.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setInstallHintOpen(false)}>Got it</Button>
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
            bottom: (theme) =>
              `calc(${theme.spacing(12)} + env(safe-area-inset-bottom))`,
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
          <ExerciseLibrary
            onSelect={handleAddExercise}
            selectionMode
            selectedExerciseIds={selectedExerciseIds}
            onToggleSelect={handleToggleExerciseSelection}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setExerciseDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddSelectedExercises}
            disabled={selectedExerciseIds.length === 0}
          >
            Add Selected
          </Button>
        </DialogActions>
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
