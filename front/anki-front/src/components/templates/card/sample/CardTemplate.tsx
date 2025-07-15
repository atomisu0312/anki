'use client';

import { addCard } from '@/actions/card/new/addcard';
import { CardAddViewModel } from '@/types/card/viewmodel';
import { FormState } from '@/types/common/form';
import React from 'react';
import { useActionState } from 'react';

const onSubmit = (state: FormState, formData: FormData) => {
  return addCard(state, formData);
}

const CardTemplate = ({ viewModel }: { viewModel: CardAddViewModel }) => {
  const initialState: FormState = { error: [], formData: undefined };
  const [formState, dispatch, isPending] = useActionState<FormState, FormData>(onSubmit, initialState);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 m-4 max-w-2xl mx-auto">
      <form action={dispatch}>
        <div className="mb-4">
          <label htmlFor="deckName" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            デッキ
          </label>
          <select
            id="deckName"
            name="deckName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            defaultValue={formState?.formData?.deckName as string}
            key="deckName"
          >
            <option value="" disabled>デッキを選択してください</option>
            {viewModel.deckNames.map((deckName) => (
              <option key={deckName} value={deckName}>{deckName}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="question" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            問題
          </label>
          <textarea
            id="question"
            name="question"
            rows={6}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="問題を入力してください"
            defaultValue={formState?.formData?.question as string}
          ></textarea>
        </div>
        <div className="mb-6">
          <label htmlFor="answer" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            答え
          </label>
          <textarea
            id="answer"
            name="answer"
            rows={6}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="答えを入力してください"
            defaultValue={formState?.formData?.answer as string}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            作成
          </button>
        </div>
        {/* エラー表示 */}
        {formState.message && (
          <div className="my-4 text-green-500 text-sm">
            {formState.message}
          </div>
        )}
        {
          formState.error && formState.error?.length > 0 && (
            <div className="my-4 text-red-500 text-sm"> 
              {formState.error.map((error) => (
                <div key={error.path.join('.')}>{error.message}</div>
              ))}
            </div>
          )
        }
      </form>
    </div>
  );
};

export default CardTemplate;
