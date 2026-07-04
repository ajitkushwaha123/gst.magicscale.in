"use client";
import React from "react";
import Home from "@/components/global/Home";

export default function Page() {
  return (
    <div className="relative bg-white dark:bg-[#0a0a1a] flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 max-w-7xl w-full mx-auto px-2 md:px-4">
        <Home />
      </div>
    </div>
  );
}
