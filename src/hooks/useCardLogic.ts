// hooks/useCardLogic.ts
// This file exports a custom hook, `useCardLogic`, that manages the logic for fetching and preparing card images.
// It handles asynchronous data fetching, manages loading and error states, and provides the shuffled set of images.

"use client";
import { useState, useEffect } from "react";
import { CardData } from "@/types/card-data";

export const useCardLogic = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //  function to fetch and process images
  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error state

      // Fetch 8 unique images asynchronously from `https://picsum.photos`.
      // - `Array.from` creates an array of 8 items, where each element's index `i` is passed to `fetch`.
      // - `Promise.all` ensures all 8 fetch requests are resolved before proceeding, returning an array of URLs.
      // - `fetch(...).then((res) => res.url)` extracts the image URL from each response.
      const uniqueImages = await Promise.all(
        Array.from({ length: 8 }, (_, i) =>
          fetch(`https://picsum.photos/200?random=${i}`).then((res) => res.url)
        )
      );

      // `pairedImages` creates duplicate pairs for each unique image to facilitate the matching game.
      // This results in an array of card objects where each image has two entries with distinct IDs.
      const pairedImages = uniqueImages.flatMap((image, index) => [
        { image, id: index * 2 },
        { image, id: index * 2 + 1 },
      ]);
      // Shuffle the paired cards to ensure random positioning in the game.
      setCards(pairedImages.sort(() => Math.random() - 0.5));
    } catch (error) {
      console.error("Failed to fetch images:", error);
      setError("Failed to load images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Call the fetch function inside useEffect
  useEffect(() => {
    fetchImages();
  }, []);

  return { cards, setCards, loading, error };
};
