"use client";

import { useRef, useEffect } from "react";
import React from "react";
import type { ConfettiRef } from "@/components/ui/confetti";
import Confetti from "@/components/ui/confetti";

interface GameResultProps {
  clicks: number;
  bestScore: number | null;
  resetGame: () => void;
  setGameCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameResult = ({ clicks, bestScore, resetGame, setGameCompleted }: GameResultProps) => {
  const confettiRef = useRef<ConfettiRef>(null);

  // Trigger confetti if clicks match the new best score
  useEffect(() => {
    if (bestScore !== null && clicks === bestScore) {
      confettiRef.current?.fire({});
    }
  }, [clicks, bestScore]);

  const handlePlayAgain = () =>{
    resetGame()
    setGameCompleted(false)

  }

  return (
    // <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border bg-background md:shadow-xl">
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white py-20 rounded-3xl shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg  relative ">
        <button
          className="absolute top-2   z-20 my-4 mx-6 text-4xl right-2 text-gray-600 hover:text-gray-800"
          onClick={handlePlayAgain}
        >
          &times;
        </button>
        <Confetti
          ref={confettiRef}
          className="absolute left-0 top-0 z-10 size-full"
        />
        <div className="relative z-20 text-center  mt-4">
          <h2 className="text-2xl font-bold">Game Completed!</h2>
          {bestScore === clicks && <p className="text-3xl font-bold tracking-tight uppercase text-green-700">🎉 New Best Score! 🎉</p>}
          {/* <h1>NEW HIGHSCORE</h1> */}
          <p>Total Clicks: {clicks}</p>
          <p>Best Score: {bestScore}</p>
          <button
            onClick={handlePlayAgain}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default GameResult;
