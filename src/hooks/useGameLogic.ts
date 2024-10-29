// "use client"
// import { useState, useEffect } from 'react';

// export const useGameLogic = () => {
//   const [flippedCards, setFlippedCards] = useState<number[]>([]);
//   const [matchedCards, setMatchedCards] = useState<number[]>([]);
  
//   const handleCardClick = (index: number) => {
//     if (flippedCards.length < 2 && !flippedCards.includes(index)) {
//       setFlippedCards([...flippedCards, index]);
//     }
//   };

//   useEffect(() => {
//     if (flippedCards.length === 2) {
//       const [first, second] = flippedCards;
//       if (cards[first] === cards[second]) {
//         setMatchedCards([...matchedCards, first, second]);
//       }
//       setTimeout(() => setFlippedCards([]), 1000);
//     }
//   }, [flippedCards]);

//   return { flippedCards, matchedCards, handleCardClick };
// };
