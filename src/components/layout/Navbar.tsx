"use client";
import React, { useState, useEffect } from "react";
import { TrophyIcon } from "@/icons";

function Navbar({ bestScore }: { bestScore: number | null }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="h-20 px-4 md:px-32 lg:flex my-2 lg:justify-between items-center">
      <div className=" text-xl  md:text-3xl justify-center flex  lg:block  tracking-tighter font-bold">
        Memory Matching Game
      </div>
      <div className="flex items-center  justify-center my-4  md:gap-2">
        <TrophyIcon />
        <div className="lg:flex lg:items-center lg:gap-2">
          <h1 className="text-md md:text-xl tracking-tight font-bold">
            Best Score:
          </h1>
          <h1 className="text-md md:text-xl tracking-tight font-bold">
            {isMounted ? (bestScore ? `${bestScore} Clicks!` : "0") : ""}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
