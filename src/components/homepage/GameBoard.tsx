"use client"
import { useState, useEffect } from 'react';
import Card from './Card';

type CardData = {
  image: string;
  id: number;
};

const GameBoard: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [clicks, setClicks] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchImages = async () => {
      const uniqueImages = await Promise.all(
        Array.from({ length: 8 }, (_, i) =>
          fetch(`https://picsum.photos/400/200?random=${i}`).then(res => res.url)
        )
      );
      const pairedImages = uniqueImages.flatMap((image, index) => [
        { image, id: index * 2 },
        { image, id: index * 2 + 1 },
      ]);
      setCards(pairedImages.sort(() => Math.random() - 0.5));
      setLoading(false); // Set loading to false when images are loaded
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameCompleted(true);
      const savedBestScore = localStorage.getItem('bestScore');
      if (savedBestScore === null || clicks < Number(savedBestScore)) {
        localStorage.setItem('bestScore', String(clicks));
        setBestScore(clicks); // Update best score
      } else {
        setBestScore(Number(savedBestScore));
      }
    }
  }, [matchedCards, cards.length, clicks]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) {
      return; // Ignore clicks if two cards are already flipped or card is matched
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);
    setClicks(clicks + 1);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (cards[firstIndex].image === cards[secondIndex].image) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setGameCompleted(false);
    setFlippedCards([]);
    setMatchedCards([]);
    setClicks(0);
    setBestScore(bestScore);
    setCards(prevCards => prevCards.sort(() => Math.random() - 0.5)); // Reshuffle cards
  };

  return (
    <div className="flex flex-col items-center">
      {loading ? ( // Display loading indicator if still loading images
        <div>Loading...</div>
      ) : gameCompleted ? (
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold">Game Completed!</h2>
          <p>Total Clicks: {clicks}</p>
          {bestScore === clicks && <p>🎉 New Best Score! 🎉</p>}
          <p>Best Score: {bestScore}</p>
          <button
            onClick={resetGame}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-8 gap-4">
          {cards.map((card, index) => (
            <Card
              key={card.id}
              image={card.image}
              isFlipped={flippedCards.includes(index) || matchedCards.includes(index)}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      )}
      <div className="mt-4 text-center">
        <p>Clicks: {clicks}</p>
      </div>
    </div>
  );
};

export default GameBoard;
