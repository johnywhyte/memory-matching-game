// GameBoard.tsx
"use client";
import React from "react";
import { useCardLogic } from "@/hooks/useCardLogic";
import { useGameLogic } from "@/hooks/useGameLogic";
import { useGameCompletion } from "@/hooks/useGameCompletion";
import GameResult from "./GameResult";
import Card from "./Card";
import Navbar from "../layout/Navbar";

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
    <div className="mb-[16rem]">
      <Navbar bestScore={bestScore}></Navbar>
      <div className="flex justify-center">
        <p className="text-2xl font-bold px-12 py-6 rounded-2xl bg-amber-300">
          Clicks: {clicks}
        </p>
      </div>
      <div className="flex flex-col items-center">
        {loading && cards.length == 0 ? ( // Display loading indicator if still loading images
          <div className="mt-20">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-blue-600 motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
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
