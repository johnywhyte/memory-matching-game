// hooks/useCardLogic.ts
"use client";
import { useState, useEffect } from "react";
import { CardData } from "@/types/card-data";

export const useCardLogic = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
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
      setLoading(false);
    };

    fetchImages();
  }, []);

  return { cards, setCards, loading };
};
