'use client';
import React, { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';

const Referral = () => {
  const [copied, setCopied] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);
  const referralCode = 'FRIEND2024'; // This would typically come from a prop or context

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = () => {
    setShareLoading(true);
    // Simulating an API call or share action
    setTimeout(() => {
      setShareLoading(false);
      // Here you would typically handle the actual share action
      alert('Shared successfully!');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6">Refer a Friend</h1>
        
        <div className="mb-6">
          <p className="text-white mb-2">Your Referral Code:</p>
          <div className="flex items-center bg-white bg-opacity-10 rounded-lg overflow-hidden">
            <input 
              type="text" 
              value={referralCode} 
              readOnly 
              className="bg-transparent text-white text-lg font-semibold py-2 px-4 flex-grow focus:outline-none"
            />
            <button 
              onClick={handleCopy}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 transition-all duration-300 ease-in-out"
            >
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <p className="text-white mb-4">Share your referral link:</p>
        <button 
          onClick={handleShare}
          disabled={shareLoading}
          className={`w-full py-2 px-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center text-white font-semibold
            ${shareLoading ? 'bg-opacity-50 cursor-not-allowed' : 'bg-white bg-opacity-20 hover:bg-opacity-30 cursor-pointer'}`}
        >
          {shareLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          ) : (
            <Share2 className="mr-2 h-5 w-5" />
          )}
          {shareLoading ? 'Sharing...' : 'Share Referral Link'}
        </button>

        <div className="mt-8">
          <p className="text-white text-sm">
            Invite friends and earn rewards! When your friends sign up using your referral code, you'll both receive special bonuses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Referral;