import React from "react";
import { TrophyIcon } from "@/icons";

function Navbar({ bestScore }: { bestScore: number | null }) {
  return (
    <div className="h-20 px-32 flex justify-between items-center">
      <div className="text-3xl tracking-tight  font-bold">
        Memory Matching Game
      </div>
      <div className="flex items-center gap-2">
        <TrophyIcon />
        <h1 className="text-xl font-bold">Best Score:</h1>
        <h1 className="text-xl font-bold">{bestScore ? `${bestScore} Clicks!` : 0} </h1>
      </div>
    </div>
  );
}

export default Navbar;
