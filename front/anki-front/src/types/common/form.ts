/**
 * フォームの状態(バリデーションエラーを返す時に使う)
 * 
 * @param error バリデーションエラー
 * @param formData フォームデータ
 * @returns フォームの状態
 * 
 */
export type FormState = {
  error?: { path: string[]; message: string; code: string; input: unknown }[];
  formData?: { [key: string]: FormDataEntryValue | null };
  success?: boolean;
  cardId?: string | number;
  message?: string;
};