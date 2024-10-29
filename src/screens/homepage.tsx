import React from "react";
import GameBoard from "@/components/homepage/GameBoard";
function homepage() {
  return (
    <div>
      <div className="flex justify-center">
        <p className="text-2xl font-bold">Memory Matching Game!</p>
      </div>
      <GameBoard />
    </div>
  );
}

export default homepage;
