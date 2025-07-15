import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const response = await fetch(`${process.env.ANKI_ADDRESS}/api/deck/list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action: 'deckNames', version: 6 }),
  });
  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch deck names' }, { status: 500 });
  }
  
  // Ankiの同期処理を実行
  const syncResponse = await fetch(`${process.env.ANKI_ADDRESS}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'sync',
      version: 6
    }),
  });

  return NextResponse.json({ deckNames: data.result });
}