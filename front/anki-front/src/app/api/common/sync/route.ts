import { NextResponse } from 'next/server';
/**
 * Ankiの同期処理(ローカル&リモート)
 * @returns 
 */
export async function POST() {
  try {
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
    const syncData = await syncResponse.json();
    console.log('Sync result:', syncData);

    return NextResponse.json({ 
      message: 'Sync completed successfully',
      result: syncData
    });
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json({ 
      message: 'Sync failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 