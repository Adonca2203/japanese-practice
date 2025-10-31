export interface KanaCharacter {
  character: string;
  romaji: string;
}

export interface VocabWord {
  english: string;
  hiragana: string;
  kanji?: string;
}

export type QuizMode = 'hiragana' | 'katakana' | 'kana' | 'vocab';

export interface Score {
  correct: number;
  total: number;
}
