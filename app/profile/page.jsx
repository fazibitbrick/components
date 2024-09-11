// app/page.js
'use client';
import Profile from '@/components/Profile';

export default function Home() {
  // In a real app, you'd fetch these values from your backend
  const level = 5;
  const coins = 100;

  return <Profile level={level} coins={coins} />;
}