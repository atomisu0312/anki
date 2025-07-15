'use server';

import { z } from 'zod'
import { FormState } from '@/types/common/form';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * 単一バリデーション
 */
const FormSchema = z.object({
  deckName: z.string({
    error: 'デッキは必須です。',
  }).min(1, 'デッキは必須です。'),
  question: z.string({
    error: '問題は必須です。',
  }).min(1, '問題は必須です。'),
  answer: z.string({
    error: '答えは必須です。',
  }).min(1, '答えは必須です。'),
});

/**
 * カードを登録
 * 
 * @param prevState 前回の状態
 * @param formData フォームデータ
 * @returns 処理結果（エラーがあれば、エラーとフォームデータが返却される）
 */
export async function addCard(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {

  // バリデーションを実行
  const validatedFields = FormSchema.safeParse({
    deckName: formData.get('deckName'),
    question: formData.get('question'),
    answer: formData.get('answer'),
  });

  // バリデーションエラーがあれば、エラーとフォームデータを返却
  if (!validatedFields.success) {
    const errorObj = validatedFields.error;
    return {
      error: errorObj.issues.map(err => ({
        path: err.path as string[],
        message: err.message,
        code: err.code,
        input: err.input
      })),
      formData: Object.fromEntries(formData.entries())
    };
  }

  // 改行記号を<br/>に置換
  const formattedData = {
    ...validatedFields.data,
    question: validatedFields.data.question.replace(/\r?\n/g, '<br/>'),
    answer: validatedFields.data.answer.replace(/\r?\n/g, '<br/>'),
  };

  // fetchで自分自身のAPIを呼び出す
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/card/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formattedData),
  });

  if (!response.ok) {
    throw new Error('カードの作成に失敗しました。');
  }

  const result = await response.json();
  const cardId = result.id; 

  // Ankiの同期処理を実行
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sync`, {
    method: 'POST',
  });
  
  revalidatePath('/card/new');
  revalidatePath(`/card/view/${cardId}`);
  
  return {
    message: result.message,
    success: true,
    error: undefined,
    formData: undefined,
  };
}
