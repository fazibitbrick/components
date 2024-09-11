// app/api/fetchNgrokData/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const ngrokUrl = 'https://edd4-2400-adc7-16d-7a00-d9f1-80e0-6e01-6eb9.ngrok-free.app';
  console.log(`Attempting to fetch data from: ${ngrokUrl}`);

  try {
    const headers = {
      'ngrok-skip-browser-warning': 'true',
      'User-Agent': 'CustomAgent/1.0 (YourAppName)'
    };
    console.log('Request headers:', headers);

    const response = await fetch(ngrokUrl, { headers });
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('Response text (first 500 characters):', responseText.substring(0, 500));

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return NextResponse.json({
        error: 'Invalid JSON response',
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        responseText: responseText.substring(0, 500),
        parseError: parseError.message
      }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({
      error: 'Failed to fetch data',
      message: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}