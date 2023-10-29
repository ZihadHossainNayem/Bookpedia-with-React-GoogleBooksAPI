"use client";
import { Books } from "./components/Books";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Books />

      {/* color palette */}
      {/* <div className="w-8 h-8 bg-[#bfe5bf]"></div>
      <div className="w-8 h-8 bg-[#d4ecd6]"></div>
      <div className="w-8 h-8 bg-[#a2ccb6]"></div>
      <div className="w-8 h-8 bg-[#f5f9f5]"></div> */}
    </div>
  );
}
