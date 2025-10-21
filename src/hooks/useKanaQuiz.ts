import { useState, useCallback, useEffect, useRef } from 'react';
import { KanaCharacter, QuizMode, Score } from '../types';
import { hiraganaCharacters } from '../data/hiragana';
import { katakanaCharacters } from '../data/katakana';
import { shuffleArray } from '../utils/shuffle';

export function useKanaQuiz() {
  const getCharactersByMode = useCallback((mode: QuizMode): KanaCharacter[] => {
    switch (mode) {
      case 'hiragana':
        return hiraganaCharacters;
      case 'katakana':
        return katakanaCharacters;
      case 'all':
        return [...hiraganaCharacters, ...katakanaCharacters];
    }
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<QuizMode>('hiragana');
  const [characters, setCharacters] = useState<KanaCharacter[]>(() => 
    shuffleArray(hiraganaCharacters)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState<Score>({ correct: 0, total: 0 });

  const handleModeChange = useCallback((newMode: QuizMode) => {
    const baseChars = getCharactersByMode(newMode);
    setMode(newMode);
    setCharacters(shuffleArray(baseChars));
    setCurrentIndex(0);
    setUserAnswer('');
    setFeedback(null);
    setScore({ correct: 0, total: 0 });
  }, [getCharactersByMode]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const correct = userAnswer.trim().toLowerCase() === characters[currentIndex].romaji.toLowerCase();
    setFeedback(correct ? 'correct' : 'incorrect');
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }));
  }, [userAnswer, characters, currentIndex]);

  const handleNext = useCallback(() => {
    setUserAnswer('');
    setFeedback(null);
    if (currentIndex === characters.length - 1) {
      const baseChars = getCharactersByMode(mode);
      setCharacters(shuffleArray(baseChars));
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [currentIndex, characters.length, mode, getCharactersByMode]);

  const handlePrevious = useCallback(() => {
    setUserAnswer('');
    setFeedback(null);
    setCurrentIndex(prev => (prev - 1 + characters.length) % characters.length);
  }, [characters.length]);

  const handleReset = useCallback(() => {
    const baseChars = getCharactersByMode(mode);
    setCharacters(shuffleArray(baseChars));
    setCurrentIndex(0);
    setUserAnswer('');
    setFeedback(null);
    setScore({ correct: 0, total: 0 });
  }, [mode, getCharactersByMode]);

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
    characters,
    currentIndex,
    userAnswer,
    feedback,
    score,
    inputRef,
    setUserAnswer,
    handleModeChange,
    handleSubmit,
    handleNext,
    handlePrevious,
    handleReset,
  };
}
