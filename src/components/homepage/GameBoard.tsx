// GameBoard.tsx
"use client";
import React from "react";
import { useCardLogic } from "@/hooks/useCardLogic";
import { useGameLogic } from "@/hooks/useGameLogic";
import { useGameCompletion } from "@/hooks/useGameCompletion";
import GameResult from "./GameResult";
import Card from "./Card";
import Navbar from "../layout/Navbar";
import { LoadingSpinner } from "@/icons";

const GameBoard = () => {
  const { cards, setCards, loading } = useCardLogic();
  const { flippedCards, matchedCards, clicks, handleCardClick, resetBoard } =
    useGameLogic(cards, setCards);

  const { gameCompleted, bestScore, setGameCompleted } = useGameCompletion(
    matchedCards,
    cards.length,
    clicks
  );

  return (
    <div>
      <Navbar bestScore={bestScore}></Navbar>
      <div className="flex justify-center">
        <p className="text-2xl font-bold px-12 py-6 rounded-2xl bg-amber-300">
          Clicks: {clicks}
        </p>
      </div>
      <div className="flex flex-col items-center">
        {loading && cards.length == 0 ? ( // Display loading indicator if still loading images
          <div className="mt-20"><LoadingSpinner /> </div>
        ) : (
          <div className="grid mt-10 grid-cols-4 gap-2">
            {cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                isFlipped={
                  flippedCards.includes(index) || matchedCards.includes(index)
                }
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>
        )}
        {gameCompleted && (
          <GameResult
            clicks={clicks}
            bestScore={bestScore}
            resetGame={resetBoard}
            setGameCompleted={setGameCompleted}
          />
        )}
      </div>
    </div>
  );
};

export default GameBoard;
