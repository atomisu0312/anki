import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { question, answer, deckName } = await request.json();

  // ここでデータベースへの保存処理などを行う
  console.log('Received data:', { question, answer, deckName });

  const response = await fetch(`${process.env.ANKI_ADDRESS}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'addNote',
      version: 6,
      params: {
        note: {
          deckName: deckName,
          modelName: '基本',
          fields: {
            表面: question,
            裏面: answer,
          },
          options: {
            allowDuplicate: false,
            duplicateScope: 'deck',
            duplicateScopeOptions: {
              deckName: deckName,
              checkChildren: false,
              checkAllModels: false
            }
          },
          tags: []
        }
      }
    }),
  });
  const data = await response.json();
  console.log(data);

  if (data.result == null && data.error != null) {
    return NextResponse.json({ message: data.error }, { status: 200 });
  }

  return NextResponse.json({ 
    message: 'Card created successfully',
    id: data.result
  });
}
