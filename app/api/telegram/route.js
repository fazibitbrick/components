// app/api/telegram/route.js
import { NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${TELEGRAM_API}/getChat?chat_id=${userId}`);
    const data = await response.json();

    if (!data.ok) {
      throw new Error(data.description);
    }

    const { first_name, last_name, username, photo } = data.result;

    return NextResponse.json({
      username: username || `${first_name} ${last_name}`,
      avatarUrl: photo?.big_file_id ? `${TELEGRAM_API}/getFile?file_id=${photo.big_file_id}` : null,
    });
  } catch (error) {
    console.error('Error fetching Telegram user data:', error);
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}