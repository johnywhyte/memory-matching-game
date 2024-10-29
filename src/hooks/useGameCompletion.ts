// hooks/useGameCompletion.ts
"use client";
import { useEffect, useState } from "react";

export const useGameCompletion = (
  matchedCards: number[],
  totalCards: number,
  clicks: number
) => {
  const [gameCompleted, setGameCompleted] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    if (matchedCards.length === totalCards && totalCards > 0) {
      setGameCompleted(true);
      const savedBestScore = localStorage.getItem("bestScore");
      if (savedBestScore === null || clicks < Number(savedBestScore)) {
        localStorage.setItem("bestScore", String(clicks));
        setBestScore(clicks); // Update best score
      } else {
        setBestScore(Number(savedBestScore));
      }
    }
  }, [matchedCards, totalCards, clicks]);

  return { gameCompleted, bestScore, setGameCompleted };
};
