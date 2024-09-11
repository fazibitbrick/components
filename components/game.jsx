"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const Game = () => {
  const [coins, setCoins] = useState(55286); // Initial coin count
  const [clickCount, setClickCount] = useState(0); // Click counter
  const [plusOne, setPlusOne] = useState([]); // Array to handle multiple '1+' animations
  const encouragementTimeoutRef = useRef(null);
  const clickTimeoutRef = useRef(null);
  const controls = useAnimation();

  // Handle the click event to generate a '1+' and increase the coin count
  const handleClick = (e) => {
    const { clientX, clientY } = e;

    // Add '1+' at the clicked position
    setPlusOne((prev) => [...prev, { id: Date.now(), x: clientX, y: clientY }]);

    // Increment the coin count
    setCoins((prevCoins) => prevCoins + 1);
    setClickCount((prevCount) => prevCount + 1);

    // Trigger the button animation
    controls.start({
      scale: [1, 0.95, 1],
      transition: { duration: 0.2 },
    });

    // Reset click count after 2 seconds of inactivity
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => setClickCount(0), 2000);

    // Show encouragement if rapid clicking
    if (clickCount > 5) {
      if (encouragementTimeoutRef.current) clearTimeout(encouragementTimeoutRef.current);
      encouragementTimeoutRef.current = setTimeout(() => setClickCount(0), 2000);
    }
  };

  // Clean up timeouts when the component unmounts
  useEffect(() => {
    return () => {
      if (encouragementTimeoutRef.current) clearTimeout(encouragementTimeoutRef.current);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  // Remove expired '1+' animations after they've run
  useEffect(() => {
    const interval = setInterval(() => {
      setPlusOne((prev) => prev.filter((el) => Date.now() - el.id < 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="bg-gradient-to-b from-black to-blue-900 min-h-screen text-white flex flex-col items-center justify-center p-4 relative overflow-hidden"
      onClick={handleClick}
    >
      {/* Coin Counter */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold">{coins.toLocaleString()}</h1>
        <p className="text-sm text-gray-400 mt-2">Mining Level: 6/10</p>

        {/* Progress Bar for Mining Level */}
        <div className="w-full max-w-xs bg-gray-700 rounded-full h-2 mt-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "80%" }}></div>
        </div>
      </div>

      {/* Big Tap Button */}
      <motion.div
        whileTap={{ scale: 0.9 }} // Button tap animation
        className="relative w-48 h-48 bg-white bg-opacity-20 backdrop-blur-lg rounded-full flex items-center justify-center shadow-lg"
      >
        <span className="text-3xl font-bold">Tap</span>
      </motion.div>

      {/* '1+' Animations */}
      {plusOne.map(({ id, x, y }) => (
        <motion.div
          key={id}
          initial={{ opacity: 1, scale: 1, y: 0 }}
          animate={{ opacity: 0, scale: 1.5, y: -50 }}
          transition={{ duration: 1 }}
          className="absolute text-2xl font-bold text-white"
          style={{ left: x - 20, top: y - 30 }}
        >
          +1
        </motion.div>
      ))}

      {/* Encouragement Message */}
      {clickCount > 5 && (
        <motion.div
          className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          Wow, you're doing great!
        </motion.div>
      )}
    </div>
  );
};

export default Game;
