import React from "react";
import { TrophyIcon } from "@/icons";

function Navbar() {
  return (
    <div className="h-20 px-32 flex justify-between items-center">
      <div className="text-xl font-bold">Username</div>
      <div className="flex items-center gap-2">
        <TrophyIcon />
        <h1 className="text-xl font-bold">12 Clicks!</h1>
      </div>
    </div>
  );
}

export default Navbar;
