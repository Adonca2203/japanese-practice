import { KanaCharacter, VocabWord } from '../types';

interface FlashCardProps {
  item: KanaCharacter | VocabWord;
  isVocab: boolean;
}

export function FlashCard({ item, isVocab }: FlashCardProps) {
  const content = isVocab ? (item as VocabWord).english : (item as KanaCharacter).character;
  
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-12 mb-6">
      <div className="text-center text-white">
        <div className={`font-bold mb-4 ${isVocab ? 'text-4xl' : 'text-8xl'}`}>
          {content}
        </div>
      </div>
    </div>
  );
}
