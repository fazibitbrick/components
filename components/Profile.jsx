'use client';
import React, { useState, useEffect } from 'react';
import { Coins } from 'lucide-react';

const Profile = ({ level, coins }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-web-app.js';
    script.async = true;
    script.onload = () => {
      if (window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.expand();
        setUserData({
          username: tg.initDataUnsafe.user.username || `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name || ''}`,
          avatarUrl: null, // Telegram Web App doesn't provide avatar URL directly
        });
        setLoading(false);
      } else {
        setError('Telegram Web App is not available');
        setLoading(false);
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="relative mb-4">
            <img 
              src="/default-avatar.jpg" 
              alt={`${userData?.username}'s avatar`} 
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
            <div className="absolute bottom-0 right-0 bg-blue-800 text-gray-900 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg border-2 border-white">
              {level}
            </div>
          </div>

          {/* Username */}
          <h1 className="text-3xl font-bold text-white mb-2">{userData?.username}</h1>

          {/* Level */}
          <p className="text-white text-lg mb-4">Level {level}</p>

          {/* Coins */}
          <div className="bg-white bg-opacity-30 rounded-full py-2 px-6 flex items-center">
            <Coins className="text-blue-800 mr-2 h-6 w-6" />
            <span className="text-white font-semibold text-lg">{coins} coins</span>
          </div>
        </div>

        {/* Additional stats or actions could be added here */}
        <div className="mt-8 space-y-2">
          <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-2 px-4 rounded-lg transition-all duration-300 ease-in-out">
            Edit Profile
          </button>
          <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-2 px-4 rounded-lg transition-all duration-300 ease-in-out">
            View Achievements
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;