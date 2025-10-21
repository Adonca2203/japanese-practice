import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  onReset: () => void;
}

export function NavigationButtons({ onPrevious, onNext, onReset }: NavigationButtonsProps) {
  return (
    <div className="flex gap-3 justify-center">
      <button
        onClick={onPrevious}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        <ChevronLeft size={20} />
        Previous
      </button>
      
      <button
        onClick={onReset}
        className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
      >
        <RotateCcw size={20} />
      </button>
      
      <button
        onClick={onNext}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        Next
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
