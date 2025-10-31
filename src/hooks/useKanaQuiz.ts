import { useState, useCallback, useEffect, useRef } from 'react';
import { KanaCharacter, QuizMode, Score, VocabWord } from '../types';
import { hiraganaCharacters } from '../data/hiragana';
import { katakanaCharacters } from '../data/katakana';
import { vocabWords } from '../data/vocab';
import { shuffleArray } from '../utils/shuffle';

export function useKanaQuiz() {
  const inputRef = useRef<HTMLInputElement>(null!);
  
  const getCharactersByMode = useCallback((mode: QuizMode): (KanaCharacter | VocabWord)[] => {
    switch (mode) {
      case 'hiragana':
        return hiraganaCharacters;
      case 'katakana':
        return katakanaCharacters;
      case 'kana':
        return [...hiraganaCharacters, ...katakanaCharacters];
      case 'vocab':
        return vocabWords;
    }
  }, []);

  const [mode, setMode] = useState<QuizMode>('hiragana');
  const [items, setItems] = useState<(KanaCharacter | VocabWord)[]>(() => 
    shuffleArray(hiraganaCharacters)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState<Score>({ correct: 0, total: 0 });

  const isVocabMode = mode === 'vocab';

  const handleModeChange = useCallback((newMode: QuizMode) => {
    const baseItems = getCharactersByMode(newMode);
    setMode(newMode);
    setItems(shuffleArray(baseItems));
    setCurrentIndex(0);
    setUserAnswer('');
    setFeedback(null);
    setScore({ correct: 0, total: 0 });
  }, [getCharactersByMode]);

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    let correct = false;
    const currentItem = items[currentIndex];
    
    if (isVocabMode) {
      const vocab = currentItem as VocabWord;
      const answer = userAnswer.trim();
      correct = answer === vocab.hiragana || answer === vocab.kanji;
    } else {
      const kana = currentItem as KanaCharacter;
      correct = userAnswer.trim().toLowerCase() === kana.romaji.toLowerCase();
    }
    
    setFeedback(correct ? 'correct' : 'incorrect');
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }));
  }, [userAnswer, items, currentIndex, isVocabMode]);

  const handleNext = useCallback(() => {
    setUserAnswer('');
    setFeedback(null);
    if (currentIndex === items.length - 1) {
      const baseItems = getCharactersByMode(mode);
      setItems(shuffleArray(baseItems));
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [currentIndex, items.length, mode, getCharactersByMode]);

  const handlePrevious = useCallback(() => {
    setUserAnswer('');
    setFeedback(null);
    setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [items.length]);

  const handleReset = useCallback(() => {
    const baseItems = getCharactersByMode(mode);
    setItems(shuffleArray(baseItems));
    setCurrentIndex(0);
    setUserAnswer('');
    setFeedback(null);
    setScore({ correct: 0, total: 0 });
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [mode, getCharactersByMode]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'Enter' && feedback !== null) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleNext, handlePrevious, feedback]);

  return {
    mode,
    items,
    currentIndex,
    userAnswer,
    feedback,
    score,
    inputRef,
    isVocabMode,
    setUserAnswer,
    handleModeChange,
    handleSubmit,
    handleNext,
    handlePrevious,
    handleReset,
  };
}
