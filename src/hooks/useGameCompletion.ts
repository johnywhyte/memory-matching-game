// hooks/useGameCompletion.ts
"use client";
import { useEffect, useState } from "react";
import usePersistedState from "./usePersistedState";

export const useGameCompletion = (
  matchedCards: number[],
  totalCards: number,
  clicks: number
) => {
  const [gameCompleted, setGameCompleted] = useState(false);
  const [bestScore, setBestScore] = usePersistedState<number | null>(
    "bestScore",
    null
  );

  useEffect(() => {
    if (matchedCards.length === totalCards && totalCards > 0) {
      setGameCompleted(true);
      if (bestScore === null || clicks < bestScore) {
        setBestScore(clicks); // Update best score in local storage
      }
    }
  }, [matchedCards, totalCards, clicks, bestScore, setBestScore]);

  return { gameCompleted, bestScore, setGameCompleted };
};
