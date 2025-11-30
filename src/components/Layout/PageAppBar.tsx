import { ReactNode, useRef, useEffect, useState, useCallback } from "react";
import { AppBar, Toolbar, Box, SxProps, Theme, keyframes } from "@mui/material";

interface PageAppBarProps {
  title: string;
  actions?: ReactNode;
  sx?: SxProps<Theme>;
}

// Variable font animation: neutral → thin slanted (word 1)
const morphToThinSlanted = keyframes`
  0% {
    opacity: 0;
    transform: translateY(5px);
    font-variation-settings: "wght" 400, "wdth" 100, "slnt" 0, "GRAD" 0;
    color: #71717A;
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    font-variation-settings: "wght" 200, "wdth" 125, "slnt" -12, "GRAD" 0;
    color: #CCFF00;
  }
`;

// Variable font animation: neutral → black condensed (word 2)
const morphToBlackCondensed = keyframes`
  0% {
    opacity: 0;
    transform: translateY(5px);
    font-variation-settings: "wght" 400, "wdth" 100, "slnt" 0, "GRAD" 0;
    color: #71717A;
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    font-variation-settings: "wght" 900, "wdth" 85, "slnt" 0, "GRAD" 0;
    color: #0F0F0F;
  }
`;

// M3 Expressive Brutalist word styles
// Dramatic contrast: thin slanted primary vs black upright
// Inspired by Material 3 Expressive: https://m3.material.io/
const wordStyles = [
  {
    // THIN SLANTED EXTREME - Hairline, ultra-wide, italic, primary color
    fontVariationSettings: '"wght" 200, "wdth" 125, "slnt" -12, "GRAD" 0',
    color: "#CCFF00", // Primary neon lime
    letterSpacing: "0.02em",
    textShadow: "1px 1px 0 #1A1C00", // Dark outline for legibility
    animation: morphToThinSlanted,
  },
  {
    // BLACK UPRIGHT - Ultra bold, condensed, standing strong
    fontVariationSettings: '"wght" 900, "wdth" 85, "slnt" 0, "GRAD" 0',
    color: "#0F0F0F",
    letterSpacing: "-0.02em",
    animation: morphToBlackCondensed,
    paddingBottom: "1px", // Compensate for first word's text shadow
  },
];

export function PageAppBar({ title, actions, sx }: PageAppBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(24);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const words = title.split(" ");

  // Wait for font to load
  useEffect(() => {
    document.fonts.ready.then(() => setFontLoaded(true));
  }, []);

  const calculateFontSize = useCallback(() => {
    if (!containerRef.current || !textRef.current) return;

    // Get available width with a small safety margin
    const containerWidth = containerRef.current.clientWidth - 4;
    const minSize = 16;
    const maxSize = 72;
    let optimalSize = minSize;

    // Binary search to find optimal font size
    let low = minSize;
    let high = maxSize;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      textRef.current.style.fontSize = `${mid}px`;

      // Force reflow and measure
      const textWidth = textRef.current.getBoundingClientRect().width;

      if (textWidth <= containerWidth) {
        optimalSize = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    // Apply the optimal size
    setFontSize(optimalSize);
  }, []);

  useEffect(() => {
    if (!fontLoaded) return;

    // Calculate after font fully renders
    const timeoutId = setTimeout(() => {
      calculateFontSize();
      setIsReady(true);
    }, 50);

    window.addEventListener("resize", calculateFontSize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", calculateFontSize);
    };
  }, [fontLoaded, calculateFontSize, title]);

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ width: "calc(100% - 32px)", mx: "auto", mt: 2, ...sx }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 72, sm: 80 },
          px: 0,
          justifyContent: "center",
        }}
      >
        <Box
          ref={containerRef}
          sx={{
            maxWidth: 500,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            ref={textRef}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25em",
              whiteSpace: "nowrap",
              fontSize: `${fontSize}px`,
            }}
          >
            {words.map((word, index) => {
              const style = wordStyles[index % wordStyles.length];
              return (
                <Box
                  key={index}
                  component="span"
                  sx={{
                    fontFamily: '"Google Sans Flex", "Outfit", sans-serif',
                    textTransform: "uppercase",
                    lineHeight: 1,
                    display: "inline-block",
                    fontVariationSettings: style.fontVariationSettings,
                    color: style.color,
                    letterSpacing: style.letterSpacing,
                    textShadow: style.textShadow || "none",
                    paddingBottom: style.paddingBottom || 0,
                    opacity: isReady ? 1 : 0,
                    animation: isReady
                      ? `${style.animation} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`
                      : "none",
                  }}
                >
                  {word}
                </Box>
              );
            })}
          </Box>
        </Box>
        {actions}
      </Toolbar>
    </AppBar>
  );
}
