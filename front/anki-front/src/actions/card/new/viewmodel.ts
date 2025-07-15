import { CardAddViewModel } from "@/types/card/viewmodel";

export async function getCardViewModel(): Promise<CardAddViewModel> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deck/list`);
  const data = await response.json();

  if (!response.ok) {
    return {
      deckNames: [],
    };
  }

  return {
    deckNames: data.deckNames,
  };
} 