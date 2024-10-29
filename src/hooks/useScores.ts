"use client";
import { useState, useEffect } from "react";

export const useMetrics = () => {
  const [clicks, setClicks] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(Infinity);

  const incrementClick = () => setClicks((prev) => prev + 1);

  useEffect(() => {
    const storedBestScore = localStorage.getItem("bestScore");
    if (storedBestScore) setBestScore(Number(storedBestScore));
  }, []);

  useEffect(() => {
    if (clicks < bestScore) {
      setBestScore(clicks);
      localStorage.setItem("bestScore", clicks.toString());
    }
  }, [clicks, bestScore]);

  return { clicks, bestScore, incrementClick };
};
