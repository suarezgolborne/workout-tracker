import { createTheme, alpha } from '@mui/material/styles'

// M3 Expressive "Kinetic Lime" Theme
// High-energy modern theme for a fitness app

// 1. THE PALETTE: High Energy & Modern
const palette = {
  mode: 'light' as const,
  primary: {
    main: '#D4FF00', // Electric Lime (High visibility, energetic)
    dark: '#A8CC00', // Darker lime for better contrast
    contrastText: '#0A0F0D', // Dark text on lime button
  },
  secondary: {
    main: '#6C5CE7', // Funky Purple for accents/charts
    dark: '#5A4AD1', // Darker purple
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#F8F9FA', // Very light grey, not stark white
    paper: '#FFFFFF',
  },
  text: {
    primary: '#0A0F0D', // Soft black
    secondary: '#58656D', // Slate grey
  },
  action: {
    active: '#0A0F0D',
  },
  success: { main: '#00C878', contrastText: '#FFF' }, // Darker green for better contrast
  error: { main: '#FF3B30' },
  info: { main: '#6C5CE7', contrastText: '#FFF' }, // Use purple for info
}

// 2. THE TYPOGRAPHY: Expressive & Chunky
const typography = {
  fontFamily: '"Plus Jakarta Sans", sans-serif',
  h1: { fontFamily: '"Outfit", sans-serif', fontWeight: 800 },
  h2: { fontFamily: '"Outfit", sans-serif', fontWeight: 800 },
  h3: { fontFamily: '"Outfit", sans-serif', fontWeight: 800 },
  h4: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
  h5: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
  h6: { fontFamily: '"Outfit", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
  button: {
    fontFamily: '"Outfit", sans-serif',
    fontWeight: 700,
    textTransform: 'none' as const, // No ALL CAPS
    fontSize: '1rem',
  },
}

export const theme = createTheme({
  palette,
  typography,
  shape: {
    borderRadius: 24, // Global "M3" roundedness (very high)
  },
  shadows: [
    'none', // Elevation 0
    '0px 4px 20px rgba(0, 0, 0, 0.05)', // Soft diffuse shadow (Elevation 1)
    '0px 8px 30px rgba(0, 0, 0, 0.08)', // Elevation 2
    '0px 8px 30px rgba(0, 0, 0, 0.08)',
    '0px 8px 30px rgba(0, 0, 0, 0.08)',
    '0px 8px 30px rgba(0, 0, 0, 0.08)',
    '0px 8px 30px rgba(0, 0, 0, 0.08)',
    '0px 8px 30px rgba(0, 0, 0, 0.08)',
    '0px 8px 30px rgba(0, 0, 0, 0.08)',
    '0px 8px 30px rgba(0, 0, 0, 0.08)',
    '0px 8px 30px rgba(0, 0, 0, 0.08)',
    '0px 8px 30px rgba(0, 0, 0, 0.08)',
    '0px 8px 30px rgba(0, 0, 0, 0.08)',
    '0px 8px 30px rgba(0, 0, 0, 0.08)',
    '0px 8px 30px rgba(0, 0, 0, 0.08)',
    '0px 8px 30px rgba(0, 0, 0, 0.08)',
    '0px 8px 30px rgba(0, 0, 0, 0.08)',
    '0px 8px 30px rgba(0, 0, 0, 0.08)',
    '0px 8px 30px rgba(0, 0, 0, 0.08)',
    '0px 8px 30px rgba(0, 0, 0, 0.08)',
    '0px 8px 30px rgba(0, 0, 0, 0.08)',
    '0px 8px 30px rgba(0, 0, 0, 0.08)',
    '0px 8px 30px rgba(0, 0, 0, 0.08)',
    '0px 8px 30px rgba(0, 0, 0, 0.08)',
    '0px 8px 30px rgba(0, 0, 0, 0.08)',
  ],
  components: {
    // --- BUTTONS (The biggest change) ---
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999, // Pill shape
          padding: '12px 24px',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-2px)', // Micro-interaction
          },
        },
        containedPrimary: {
          border: '2px solid #0A0F0D', // Neo-brutalism touch
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(212, 255, 0, 0.4)', // Glow effect
          },
        },
        outlinedPrimary: {
          borderColor: palette.text.primary,
          color: palette.text.primary,
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
            borderColor: palette.text.primary,
            backgroundColor: alpha(palette.text.primary, 0.05),
          },
        },
        textPrimary: {
          color: palette.text.primary,
          '&:hover': {
            backgroundColor: alpha(palette.text.primary, 0.05),
          },
        },
        containedSecondary: {
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(108, 92, 231, 0.4)',
          },
        },
      },
    },
    // --- CARDS (Your workout sets) ---
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          border: '1px solid #EFF1F5',
          boxShadow: '0px 4px 20px rgba(0,0,0,0.02)', // Very subtle
          overflow: 'visible', // Allows for playful elements popping out
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
        },
      },
    },
    // --- INPUTS (Weight/Reps) ---
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: '#F4F6F8',
          '& fieldset': { border: 'none' }, // Hide the default border
          '&:hover': { backgroundColor: '#EBEDF0' },
          '&.Mui-focused': {
            backgroundColor: '#FFFFFF',
            boxShadow: `0 0 0 2px ${palette.secondary.main}`, // Funky focus ring
          },
        },
        input: {
          fontWeight: 700, // Bold numbers for weights
          textAlign: 'center',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
            backgroundColor: '#F4F6F8',
            '& fieldset': { border: 'none' },
            '&:hover': { backgroundColor: '#EBEDF0' },
            '&.Mui-focused': {
              backgroundColor: '#FFFFFF',
              boxShadow: `0 0 0 2px ${palette.secondary.main}`,
            },
          },
        },
      },
    },
    // --- APP BAR (Header) ---
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          color: palette.text.primary,
          boxShadow: 'none',
          borderBottom: '1px dashed #E0E0E0', // Technical feel
        },
      },
    },
    // --- BOTTOM NAVIGATION ---
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          borderTop: 'none',
          height: 80,
          borderRadius: '32px 32px 0 0', // Rounded top sheet look
          boxShadow: '0px -10px 40px rgba(0,0,0,0.03)',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: palette.secondary.main,
          },
        },
        label: {
          fontFamily: '"Outfit", sans-serif',
          fontWeight: 600,
        },
      },
    },
    // --- FAB (The + button) ---
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: '0px 8px 20px rgba(108, 92, 231, 0.4)',
        },
        secondary: {
          backgroundColor: palette.secondary.main,
          color: '#FFF',
          '&:hover': {
            backgroundColor: palette.secondary.dark,
          },
        },
      },
    },
    // --- PAPER (General surfaces) ---
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 24,
        },
        outlined: {
          borderRadius: 16,
          border: '1px solid #EFF1F5',
        },
      },
    },
    // --- CHIPS ---
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
        },
        colorPrimary: {
          backgroundColor: alpha(palette.secondary.main, 0.12),
          color: palette.secondary.main,
          '&.MuiChip-filled': {
            backgroundColor: palette.secondary.main,
            color: '#FFFFFF',
          },
        },
        outlinedPrimary: {
          borderColor: palette.secondary.main,
          color: palette.secondary.main,
          borderWidth: '2px',
        },
      },
    },
    // --- ICON BUTTONS ---
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: alpha(palette.secondary.main, 0.1),
          },
        },
      },
    },
  },
})
