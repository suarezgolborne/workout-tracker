import { useState, useEffect } from "react";
import { Box, keyframes } from "@mui/material";

// Staggered slide-in animation for each word
const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100%) skewX(-10deg);
  }
  60% {
    opacity: 1;
    transform: translateX(5%) skewX(2deg);
  }
  100% {
    opacity: 1;
    transform: translateX(0) skewX(0deg);
  }
`;

// Exit animation - explode outward
const explodeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateX(100vw) scale(0.5) rotate(10deg);
  }
`;

// Container fade out
const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

// Accent bar animations with specific rotations
const barSlideIn1 = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50vw) rotate(-15deg);
  }
  100% {
    opacity: 0.8;
    transform: translateX(0) rotate(-15deg);
  }
`;

const barSlideIn2 = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50vw) rotate(25deg);
  }
  100% {
    opacity: 0.8;
    transform: translateX(0) rotate(25deg);
  }
`;

const barSlideIn3 = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50vw) rotate(-8deg);
  }
  100% {
    opacity: 0.5;
    transform: translateX(0) rotate(-8deg);
  }
`;

// Variable font morph animation
const fontMorph = keyframes`
  0% {
    font-variation-settings: "wght" 900, "wdth" 75, "slnt" 0;
  }
  50% {
    font-variation-settings: "wght" 200, "wdth" 125, "slnt" -12;
  }
  100% {
    font-variation-settings: "wght" 900, "wdth" 100, "slnt" 0;
  }
`;

interface SplashScreenProps {
  onComplete: () => void;
}

const words = ["jack", "jack", "jack", "your", "body"];

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit" | "done">(
    "enter"
  );
  const [barsAnimated, setBarsAnimated] = useState(false);

  useEffect(() => {
    // Mark bars as animated after their animations complete (longest is 0.5s delay + 0.4s duration)
    const barsTimer = setTimeout(() => {
      setBarsAnimated(true);
    }, 1000);

    // Enter phase: words animate in
    const enterTimer = setTimeout(() => {
      setPhase("hold");
    }, 1200);

    // Hold phase: brief pause
    const holdTimer = setTimeout(() => {
      setPhase("exit");
    }, 1800);

    // Exit phase: animate out
    const exitTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2600);

    return () => {
      clearTimeout(barsTimer);
      clearTimeout(enterTimer);
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        bgcolor: "#0F0F0F",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 2,
        paddingLeft: 1,
        overflow: "hidden",
        animation:
          phase === "exit" ? `${fadeOut} 0.8s ease-in forwards` : "none",
        animationDelay: phase === "exit" ? "0s" : "0s",
      }}
    >
      {words.map((word, index) => {
        // Alternate colors: primary (lime) and secondary (violet)
        const isPrimary = index % 2 === 0;
        const color = isPrimary ? "#CCFF00" : "#7C3AED";
        const textShadow = isPrimary
          ? "3px 3px 0 #7C3AED, -1px -1px 0 #7C3AED"
          : "3px 3px 0 #CCFF00, -1px -1px 0 #CCFF00";

        return (
          <Box
            key={index}
            sx={{
              fontFamily: '"Google Sans Flex", "Outfit", sans-serif',
              fontSize: "clamp(3rem, 42vw, 8rem)",
              fontWeight: 900,
              textTransform: "lowercase",
              color,
              textShadow,
              lineHeight: 0.82,
              letterSpacing: "-0.04em",
              opacity: 0,
              ml: 4,
              animation:
                phase === "exit"
                  ? `${explodeOut} 0.6s cubic-bezier(0.55, 0, 1, 0.45) forwards`
                  : `${slideIn} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, ${fontMorph} 2s ease-in-out infinite`,
              animationDelay:
                phase === "exit" ? `${index * 0.05}s` : `${index * 0.1}s`,
              fontVariationSettings: '"wght" 900, "wdth" 100, "slnt" 0',
              WebkitTextStroke: "1px rgba(255,255,255,0.1)",
            }}
          >
            {word}
          </Box>
        );
      })}

      {/* Decorative accent bars like in the reference */}
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          right: "10%",
          width: "20vw",
          height: "3vw",
          bgcolor: "#FF6B6B",
          opacity: barsAnimated ? 0.8 : undefined,
          transform: barsAnimated ? "rotate(-15deg)" : undefined,
          animation:
            phase === "exit"
              ? `${fadeOut} 0.3s ease-out forwards`
              : barsAnimated
              ? "none"
              : `${barSlideIn1} 0.4s ease-out 0.3s both`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          left: "5%",
          width: "15vw",
          height: "2.5vw",
          bgcolor: "#FF6B6B",
          opacity: barsAnimated ? 0.8 : undefined,
          transform: barsAnimated ? "rotate(25deg)" : undefined,
          animation:
            phase === "exit"
              ? `${fadeOut} 0.3s ease-out forwards`
              : barsAnimated
              ? "none"
              : `${barSlideIn2} 0.4s ease-out 0.4s both`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "45%",
          right: "-5%",
          width: "25vw",
          height: "2vw",
          bgcolor: "#7C3AED",
          opacity: barsAnimated ? 0.5 : undefined,
          transform: barsAnimated ? "rotate(-8deg)" : undefined,
          animation:
            phase === "exit"
              ? `${fadeOut} 0.3s ease-out forwards`
              : barsAnimated
              ? "none"
              : `${barSlideIn3} 0.4s ease-out 0.5s both`,
        }}
      />
    </Box>
  );
}
