import { createTheme, alpha } from '@mui/material/styles'

// ============================================================================
// M3 EXPRESSIVE THEME - "KINETIC ENERGY"
// Based on Material 3 Expressive design research:
// - https://design.google/library/expressive-material-design-google-research
// - https://m3.material.io/blog/building-with-m3-expressive
// ============================================================================

// 1. COLOR PALETTE
// M3 Expressive uses three accent layers (primary, secondary, tertiary)
// with high chroma (48+) for vibrant, energetic feel
const palette = {
  mode: 'light' as const,

  // PRIMARY: Neon Lime - High energy, athletic, modern
  primary: {
    main: '#CCFF00',      // Chroma ~80, very vibrant
    light: '#E8FF80',     // Lighter tint for hover states
    dark: '#99CC00',      // Darker shade for pressed/contrast
    contrastText: '#1A1C00', // Near-black for readability
  },

  // SECONDARY: Electric Violet - Creative, bold, expressive
  secondary: {
    main: '#7C3AED',      // Vibrant purple (violet-500)
    light: '#A78BFA',     // Light violet
    dark: '#5B21B6',      // Deep violet
    contrastText: '#FFFFFF',
  },

  // TERTIARY: Hot Coral - Energetic accent, warmth
  tertiary: {
    main: '#FF6B6B',      // Vibrant coral/red
    light: '#FFA8A8',     // Light coral
    dark: '#EE5A5A',      // Deep coral
    contrastText: '#FFFFFF',
  },

  // SURFACE COLORS - Subtle tints for depth
  background: {
    default: '#FAFAFA',   // Warm off-white
    paper: '#FFFFFF',
  },

  // TEXT
  text: {
    primary: '#0F0F0F',   // Rich black
    secondary: '#52525B', // Zinc-600
  },

  // SEMANTIC COLORS - High saturation
  success: {
    main: '#10B981',      // Emerald
    light: '#34D399',
    dark: '#059669',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#EF4444',      // Red-500
    light: '#F87171',
    dark: '#DC2626',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#F59E0B',      // Amber
    light: '#FBBF24',
    dark: '#D97706',
    contrastText: '#000000',
  },
  info: {
    main: '#06B6D4',      // Cyan
    light: '#22D3EE',
    dark: '#0891B2',
    contrastText: '#FFFFFF',
  },

  // ACTION COLORS
  action: {
    active: '#7C3AED',
    hover: alpha('#7C3AED', 0.08),
    selected: alpha('#7C3AED', 0.12),
    disabled: '#A1A1AA',
    disabledBackground: '#E4E4E7',
  },
}

// 2. TYPOGRAPHY - M3 Expressive uses emphasized styles
// Display/Headline: Heavy weights (700-800), tight tracking
const typography = {
  fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif',

  // DISPLAY - Extra bold, tight tracking
  h1: {
    fontFamily: '"Outfit", sans-serif',
    fontWeight: 800,
    fontSize: '3.5rem',
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
  },
  h2: {
    fontFamily: '"Outfit", sans-serif',
    fontWeight: 800,
    fontSize: '2.75rem',
    lineHeight: 1.15,
    letterSpacing: '-0.02em',
  },
  h3: {
    fontFamily: '"Outfit", sans-serif',
    fontWeight: 800,
    fontSize: '2.25rem',
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },

  // HEADLINE - Bold, expressive
  h4: {
    fontFamily: '"Outfit", sans-serif',
    fontWeight: 700,
    fontSize: '1.75rem',
    lineHeight: 1.25,
    letterSpacing: '-0.01em',
  },
  h5: {
    fontFamily: '"Outfit", sans-serif',
    fontWeight: 700,
    fontSize: '1.5rem',
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
  },
  h6: {
    fontFamily: '"Outfit", sans-serif',
    fontWeight: 700,
    fontSize: '1.25rem',
    lineHeight: 1.35,
    letterSpacing: '-0.01em',
  },

  // BODY - Clean, readable
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6,
    fontWeight: 500,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
    fontWeight: 500,
  },

  // LABELS - Semi-bold for emphasis
  subtitle1: {
    fontFamily: '"Outfit", sans-serif',
    fontSize: '1rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  subtitle2: {
    fontFamily: '"Outfit", sans-serif',
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },

  // BUTTON - Bold, no caps
  button: {
    fontFamily: '"Outfit", sans-serif',
    fontWeight: 700,
    textTransform: 'none' as const,
    fontSize: '1rem',
    letterSpacing: '0.01em',
  },

  caption: {
    fontSize: '0.75rem',
    fontWeight: 600,
    lineHeight: 1.4,
  },

  overline: {
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
  },
}

// 3. SHAPE - M3 Expressive 10-step scale
// Uses squircle-inspired super-ellipse corners
const shape = {
  borderRadius: 20, // Base radius (medium)
}

// 4. SHADOWS - Soft, diffuse for modern feel
const shadows = [
  'none',
  '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
  '0 4px 6px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.06)',
  '0 10px 15px rgba(0,0,0,0.04), 0 4px 6px rgba(0,0,0,0.05)',
  '0 20px 25px rgba(0,0,0,0.05), 0 8px 10px rgba(0,0,0,0.04)',
  '0 25px 50px rgba(0,0,0,0.08)',
  ...Array(19).fill('0 25px 50px rgba(0,0,0,0.08)'),
] as const

// 5. TRANSITIONS - Physics-based spring motion
const transitions = {
  duration: {
    shortest: 100,
    shorter: 150,
    short: 200,
    standard: 250,
    complex: 350,
    enteringScreen: 225,
    leavingScreen: 195,
  },
  easing: {
    // M3 Expressive spring-like curves
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    // Custom expressive curves
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    bounce: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  },
}

export const theme = createTheme({
  palette,
  typography,
  shape,
  shadows: shadows as any,
  transitions,

  components: {
    // =========================================================================
    // BUTTONS - M3 Expressive: XS=32, S=36, M=40, L=48, XL=56
    // Shape morphing, spring animations, bold styling
    // =========================================================================
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 100,
          padding: '12px 24px',
          fontWeight: 700,
          fontSize: '1rem',
          minHeight: 44,
          transition: 'transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease',
          '@media (hover: hover)': {
            '&:hover': {
              transform: 'translateY(-2px)',
            },
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: palette.primary.main,
          border: '2px solid #1A1C00',
          boxShadow: '3px 3px 0 #1A1C00',
          '&:hover': {
            background: palette.primary.light,
            boxShadow: '4px 4px 0 #1A1C00',
          },
          '&:active': {
            boxShadow: '1px 1px 0 #1A1C00',
          },
        },
        containedSecondary: {
          background: palette.secondary.main,
          border: '2px solid #1A1C00',
          boxShadow: '3px 3px 0 #1A1C00',
          '&:hover': {
            background: palette.secondary.light,
            boxShadow: '4px 4px 0 #1A1C00',
          },
        },
        outlined: {
          borderWidth: '2px',
          borderColor: palette.secondary.main,
          color: palette.secondary.main,
          backgroundColor: '#FFFFFF',
          '&:hover': {
            borderWidth: '2px',
            backgroundColor: alpha(palette.secondary.main, 0.08),
            borderColor: palette.secondary.dark,
          },
        },
        text: {
          color: palette.secondary.main,
          fontWeight: 700,
          '&:hover': {
            backgroundColor: alpha(palette.secondary.main, 0.08),
          },
        },
        sizeLarge: {
          minHeight: 52,
          padding: '14px 32px',
          fontSize: '1.125rem',
        },
        sizeSmall: {
          minHeight: 36,
          padding: '8px 16px',
          fontSize: '0.875rem',
        },
      },
    },

    // =========================================================================
    // FAB - Fixed for mobile, proper sizing
    // =========================================================================
    MuiFab: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontFamily: '"Outfit", sans-serif',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          border: '2px solid #1A1C00',
          boxShadow: '3px 3px 0 #1A1C00',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '4px 4px 0 #1A1C00',
          },
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: '2px 2px 0 #1A1C00',
          },
        },
        primary: {
          background: palette.primary.main,
          color: palette.primary.contrastText,
        },
        secondary: {
          background: `linear-gradient(135deg, ${palette.secondary.main} 0%, ${palette.secondary.dark} 100%)`,
          color: '#FFFFFF',
        },
        extended: {
          height: 48,
          padding: '0 20px',
          borderRadius: 24,
          gap: 8,
          '& .MuiSvgIcon-root': {
            fontSize: 20,
          },
        },
        sizeMedium: {
          width: 48,
          height: 48,
        },
      },
    },

    // =========================================================================
    // CARDS - Clean containers with subtle interactions
    // =========================================================================
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: '1px solid #E4E4E7',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          overflow: 'hidden',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
          '&:last-child': {
            paddingBottom: 24,
          },
        },
      },
    },

    // =========================================================================
    // PAPER - Expressive containers with squircle corners
    // =========================================================================
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 24,
        },
        outlined: {
          borderRadius: 20,
          border: '2px solid #E4E4E7',
        },
        elevation1: {
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        },
        elevation2: {
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
        },
      },
    },

    // =========================================================================
    // INPUTS - Clean, readable labels above input
    // =========================================================================
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: palette.text.secondary,
            fontWeight: 600,
            fontSize: '0.875rem',
            '&.Mui-focused': {
              color: palette.secondary.main,
            },
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: '#F4F4F5',
            transition: 'background-color 0.2s ease, border-color 0.2s ease',
            '& fieldset': {
              borderColor: 'transparent',
              borderWidth: 2,
            },
            '&:hover': {
              backgroundColor: '#EBEBED',
              '& fieldset': {
                borderColor: '#D4D4D8',
              },
            },
            '&.Mui-focused': {
              backgroundColor: '#FFFFFF',
              '& fieldset': {
                borderColor: palette.secondary.main,
                borderWidth: 2,
              },
            },
          },
          '& .MuiOutlinedInput-input': {
            fontWeight: 600,
            fontSize: '1rem',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: palette.text.secondary,
          fontWeight: 600,
          '&.Mui-focused': {
            color: palette.secondary.main,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#F4F4F5',
          '& fieldset': {
            borderColor: 'transparent',
            borderWidth: 2,
          },
          '&:hover fieldset': {
            borderColor: '#D4D4D8',
          },
          '&.Mui-focused fieldset': {
            borderColor: palette.secondary.main,
          },
        },
        input: {
          fontWeight: 600,
        },
      },
    },

    // =========================================================================
    // CHIPS - Bold, clean styling
    // =========================================================================
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 600,
          fontFamily: '"Outfit", sans-serif',
          fontSize: '0.8125rem',
          height: 32,
        },
        filled: {
          backgroundColor: palette.secondary.main,
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: palette.secondary.dark,
          },
        },
        outlined: {
          borderWidth: '2px',
          borderColor: palette.secondary.main,
          color: palette.secondary.main,
          fontWeight: 600,
          '&:hover': {
            backgroundColor: alpha(palette.secondary.main, 0.08),
          },
        },
        colorPrimary: {
          backgroundColor: palette.secondary.main,
          color: '#FFFFFF',
        },
        colorSecondary: {
          backgroundColor: palette.tertiary.main,
          color: '#FFFFFF',
        },
      },
    },

    // =========================================================================
    // APP BAR - With proper padding for content
    // =========================================================================
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          color: palette.text.primary,
          boxShadow: 'none',
          borderBottom: '2px solid #E4E4E7',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 64,
          paddingLeft: 16,
          paddingRight: 16,
          '@media (min-width: 600px)': {
            paddingLeft: 24,
            paddingRight: 24,
          },
        },
      },
    },

    // =========================================================================
    // BOTTOM NAVIGATION - Clean, mobile-friendly
    // =========================================================================
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          height: 72,
          borderTop: '1px solid #E4E4E7',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          transition: 'color 0.15s ease',
          minWidth: 64,
          '&.Mui-selected': {
            color: palette.secondary.main,
          },
        },
        label: {
          fontFamily: '"Outfit", sans-serif',
          fontWeight: 600,
          fontSize: '0.75rem',
          '&.Mui-selected': {
            fontSize: '0.75rem',
            fontWeight: 700,
          },
        },
      },
    },

    // =========================================================================
    // ICON BUTTONS - Mobile-optimized tap targets
    // =========================================================================
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.15s ease',
          '&:hover': {
            backgroundColor: alpha(palette.secondary.main, 0.1),
          },
          '&:active': {
            backgroundColor: alpha(palette.secondary.main, 0.2),
          },
        },
        colorError: {
          '&:hover': {
            backgroundColor: alpha(palette.error.main, 0.1),
          },
          '&:active': {
            backgroundColor: alpha(palette.error.main, 0.2),
          },
        },
      },
    },

    // =========================================================================
    // DIALOGS - Large radius, M3 spec (28dp)
    // =========================================================================
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 28, // M3 dialog radius
          border: '2px solid #E4E4E7',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: '"Outfit", sans-serif',
          fontWeight: 700,
          fontSize: '1.5rem',
          padding: '24px 24px 16px',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px 24px',
          gap: 12,
        },
      },
    },

    // =========================================================================
    // LIST ITEMS - Clean hover states
    // =========================================================================
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: '2px 8px',
          '&:hover': {
            backgroundColor: alpha(palette.secondary.main, 0.06),
          },
          '&:active': {
            backgroundColor: alpha(palette.secondary.main, 0.12),
          },
          '&.Mui-selected': {
            backgroundColor: alpha(palette.secondary.main, 0.1),
            '&:hover': {
              backgroundColor: alpha(palette.secondary.main, 0.14),
            },
          },
        },
      },
    },

    // =========================================================================
    // PROGRESS INDICATORS
    // =========================================================================
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          height: 8,
          backgroundColor: alpha(palette.secondary.main, 0.15),
        },
        bar: {
          borderRadius: 100,
          background: `linear-gradient(90deg, ${palette.secondary.main} 0%, ${palette.tertiary.main} 100%)`,
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        colorPrimary: {
          color: palette.secondary.main,
        },
      },
    },
  },
})

// Export tertiary palette for use in components
export { palette }
