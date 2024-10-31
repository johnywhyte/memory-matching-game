// hooks/useGameLogic.ts
"use client";
import { useState } from "react";
import { CardData } from "@/types/card-data";

export const useGameLogic = (
  cards: CardData[],
  setCards: (cards: CardData[]) => void
) => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [clicks, setClicks] = useState(0);

  const handleCardClick = (index: number) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(index) ||
      matchedCards.includes(index)
    ) {
      return; // Ignore clicks if two cards are already flipped or card is matched
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);
    setClicks((prevClicks) => prevClicks + 1);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (cards[firstIndex].image === cards[secondIndex].image) {
        setMatchedCards((prevMatched) => [
          ...prevMatched,
          firstIndex,
          secondIndex,
        ]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetBoard = () => {
    setFlippedCards([]);
    setMatchedCards([]);
    setClicks(0);
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5); // Shuffle a copy of the current cards
    setCards(shuffledCards); // Update cards with shuffled array
  };

  return { flippedCards, matchedCards, clicks, handleCardClick, resetBoard };
};
