'use client';
import Game from "@/components/game";
import Navbar from "@/components/Navbar";

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-blue-900 text-white">
      <Game />
      <Navbar />
    </div>
  );
}
