import { KanaCharacter } from '../types';

interface FlashCardProps {
  character: KanaCharacter;
}

export function FlashCard({ character }: FlashCardProps) {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-12 mb-6">
      <div className="text-center text-white">
        <div className="text-8xl font-bold mb-4">
          {character.character}
        </div>
      </div>
    </div>
  );
}
