import { createTheme, alpha } from '@mui/material/styles'

// M3 Expressive "Kinetic Lime" Theme
// High-energy modern theme for a fitness app

// 1. THE PALETTE: High Energy & SUPER VIBRANT
const palette = {
  mode: 'light' as const,
  primary: {
    main: '#DAFF00', // NEON Lime - even brighter!
    light: '#F0FF80', // Light lime for backgrounds
    dark: '#A8CC00', // Darker lime for better contrast
    contrastText: '#0A0F0D', // Dark text on lime button
  },
  secondary: {
    main: '#7C4DFF', // More vibrant purple (Material Deep Purple A200)
    light: '#B47CFF', // Light purple for backgrounds
    dark: '#651FFF', // Deep vibrant purple
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#FAFBFC', // Subtle cool tint
    paper: '#FFFFFF',
  },
  text: {
    primary: '#0A0F0D', // Soft black
    secondary: '#5A6C7D', // Slate with subtle blue tint
  },
  action: {
    active: '#7C4DFF', // Use vibrant purple
  },
  success: { main: '#00E676', light: '#69F0AE', contrastText: '#000' }, // Neon green
  error: { main: '#FF3D00', light: '#FF6E40' }, // More vibrant red-orange
  warning: { main: '#FFD600', light: '#FFEA00', contrastText: '#000' }, // Vibrant yellow
  info: { main: '#00E5FF', light: '#84FFFF', contrastText: '#000' }, // Vibrant cyan
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
          fontWeight: 700,
          '&:hover': {
            transform: 'translateY(-2px)', // Micro-interaction
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${palette.primary.main} 0%, ${palette.primary.dark} 100%)`,
          border: '3px solid #0A0F0D', // Thicker neo-brutalism border
          '&:hover': {
            background: `linear-gradient(135deg, ${palette.primary.light} 0%, ${palette.primary.main} 100%)`,
            boxShadow: '0px 8px 24px rgba(218, 255, 0, 0.5)', // Stronger glow
          },
        },
        outlinedPrimary: {
          borderColor: palette.text.primary,
          color: palette.text.primary,
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
            borderColor: palette.text.primary,
            backgroundColor: alpha(palette.secondary.light, 0.12),
          },
        },
        textPrimary: {
          color: palette.text.primary,
          '&:hover': {
            backgroundColor: alpha(palette.secondary.light, 0.12),
          },
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${palette.secondary.main} 0%, ${palette.secondary.dark} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${palette.secondary.light} 0%, ${palette.secondary.main} 100%)`,
            boxShadow: '0px 8px 24px rgba(124, 77, 255, 0.5)',
          },
        },
        sizeLarge: {
          padding: '16px 32px',
          fontSize: '1.1rem',
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
          fontWeight: 700,
        },
        secondary: {
          background: `linear-gradient(135deg, ${palette.secondary.main} 0%, ${palette.secondary.dark} 100%)`,
          color: '#FFF',
          boxShadow: '0px 12px 28px rgba(124, 77, 255, 0.5)',
          '&:hover': {
            background: `linear-gradient(135deg, ${palette.secondary.light} 0%, ${palette.secondary.main} 100%)`,
            boxShadow: '0px 16px 36px rgba(124, 77, 255, 0.6)',
            transform: 'scale(1.05)',
          },
        },
        extended: {
          padding: '16px 28px',
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
          fontWeight: 700,
          fontSize: '0.8125rem',
        },
        filled: {
          background: `linear-gradient(135deg, ${palette.secondary.main} 0%, ${palette.secondary.dark} 100%)`,
          color: '#FFF',
        },
        colorPrimary: {
          background: `linear-gradient(135deg, ${palette.secondary.main} 0%, ${palette.secondary.dark} 100%)`,
          color: '#FFF',
        },
        colorSecondary: {
          background: `linear-gradient(135deg, ${palette.secondary.main} 0%, ${palette.secondary.dark} 100%)`,
          color: '#FFF',
        },
        outlinedPrimary: {
          borderColor: palette.secondary.main,
          color: palette.secondary.main,
          borderWidth: '2px',
          backgroundColor: alpha(palette.secondary.light, 0.08),
        },
        outlinedSecondary: {
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
