import { QuizMode } from '../types';

interface ModeSelectorProps {
  mode: QuizMode;
  onModeChange: (mode: QuizMode) => void;
}

export function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  return (
    <select 
      value={mode}
      onChange={(e) => onModeChange(e.target.value as QuizMode)}
      className="mb-4 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 text-lg font-semibold"
    >
      <option value="hiragana">Hiragana</option>
      <option value="katakana">Katakana</option>
      <option value="kana">Kana (Hiragana + Katakana)</option>
      <option value={"vocab"}>Vocab</option>
    </select>
  );
}
