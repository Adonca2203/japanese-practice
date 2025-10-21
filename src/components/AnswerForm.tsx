import React from 'react';
import { KanaCharacter } from '../types';

interface AnswerFormProps {
  userAnswer: string;
  feedback: 'correct' | 'incorrect' | null;
  character: KanaCharacter;
  inputRef: React.RefObject<HTMLInputElement>;
  onAnswerChange: (answer: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AnswerForm({ 
  userAnswer, 
  feedback, 
  character,
  inputRef,
  onAnswerChange, 
  onSubmit 
}: AnswerFormProps) {
  return (
    <form onSubmit={onSubmit} className="mb-6">
      <input
        ref={inputRef}
        type="text"
        value={userAnswer}
        onChange={(e) => onAnswerChange(e.target.value)}
        placeholder="Type the romaji..."
        disabled={feedback !== null}
        className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 mb-3"
        autoComplete="off"
        autoFocus
      />
      
      {feedback === null ? (
        <button
          type="submit"
          disabled={!userAnswer.trim()}
          className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Check Answer
        </button>
      ) : (
        <div className={`w-full py-3 px-6 rounded-lg text-center font-semibold ${
          feedback === 'correct' 
            ? 'bg-green-100 text-green-800 border-2 border-green-500' 
            : 'bg-red-100 text-red-800 border-2 border-red-500'
        }`}>
          {feedback === 'correct' ? (
            <div>
              <div className="text-xl mb-1">✓ Correct!</div>
              <div className="text-sm">{character.romaji}</div>
            </div>
          ) : (
            <div>
              <div className="text-xl mb-1">✗ Incorrect</div>
              <div className="text-sm">The answer is: {character.romaji}</div>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
