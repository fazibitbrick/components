'use client';
import React, { useState, useEffect } from 'react';
import { Instagram, Youtube, Facebook, Check } from 'lucide-react';

const Task = () => {
  const [buttonStates, setButtonStates] = useState({
    instagram: { loading: false, completed: false },
    youtube: { loading: false, completed: false },
    facebook: { loading: false, completed: false },
  });

  const handleButtonClick = (platform) => {
    setButtonStates((prev) => ({
      ...prev,
      [platform]: { loading: true, completed: false },
    }));

    setTimeout(() => {
      setButtonStates((prev) => ({
        ...prev,
        [platform]: { loading: false, completed: true },
      }));
    }, 10000); // 10 seconds loading
  };

  useEffect(() => {
    Object.entries(buttonStates).forEach(([platform, state]) => {
      if (state.completed) {
        const timer = setTimeout(() => {
          setButtonStates((prev) => ({
            ...prev,
            [platform]: { loading: false, completed: false },
          }));
        }, 3000); // Reset after 3 seconds
        return () => clearTimeout(timer);
      }
    });
  }, [buttonStates]);

  const renderButtonContent = (platform, icon) => {
    const { loading, completed } = buttonStates[platform];
    if (loading) {
      return (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Loading...
        </>
      );
    }
    if (completed) {
      return (
        <>
          <Check className="mr-2 h-4 w-4 text-green-500" />
          You've done that!
        </>
      );
    }
    return (
      <>
        {icon}
        {platform.charAt(0).toUpperCase() + platform.slice(1)} Follow
      </>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="space-y-4 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6">Task Screen</h1>
        
        {[
          { platform: 'instagram', icon: <Instagram className="mr-2 h-4 w-4" /> },
          { platform: 'youtube', icon: <Youtube className="mr-2 h-4 w-4" /> },
          { platform: 'facebook', icon: <Facebook className="mr-2 h-4 w-4" /> },
        ].map(({ platform, icon }) => (
          <button 
            key={platform}
            className={`w-full py-2 px-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center text-white font-semibold
              ${buttonStates[platform].loading || buttonStates[platform].completed
                ? 'bg-opacity-50 cursor-not-allowed'
                : 'hover:bg-opacity-30 cursor-pointer'
              }
              ${buttonStates[platform].completed
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-white bg-opacity-20'
              }`}
            onClick={() => handleButtonClick(platform)}
            disabled={buttonStates[platform].loading || buttonStates[platform].completed}
          >
            {renderButtonContent(platform, icon)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Task;