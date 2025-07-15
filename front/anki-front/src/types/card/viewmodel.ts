/**
 * カード追加用のビューモデル
 * 
 * template内でデータを扱う際に使います（基本的にはStringのレコードを持つだけにとどめましょう）
 */
export type CardAddViewModel = {
  deckNames: string[];
};