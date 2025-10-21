export interface KanaCharacter {
  character: string;
  romaji: string;
}

export type QuizMode = 'hiragana' | 'katakana' | 'all';

export interface Score {
  correct: number;
  total: number;
}
