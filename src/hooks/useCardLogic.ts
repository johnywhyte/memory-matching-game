// hooks/useCardLogic.ts
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

      const uniqueImages = await Promise.all(
        Array.from({ length: 8 }, (_, i) =>
          fetch(`https://picsum.photos/200?random=${i}`).then((res) => res.url)
        )
      );

      const pairedImages = uniqueImages.flatMap((image, index) => [
        { image, id: index * 2 },
        { image, id: index * 2 + 1 },
      ]);

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
