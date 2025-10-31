import { ModeSelector } from './components/ModeSelector';
import { FlashCard } from './components/FlashCard';
import { AnswerForm } from './components/AnswerForm';
import { NavigationButtons } from './components/NavigationButtons';
import { useKanaQuiz } from './hooks/useKanaQuiz';

export default function App() {
  const {
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
  } = useKanaQuiz();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Japanese Practice</h1>
          
          <ModeSelector mode={mode} onModeChange={handleModeChange} />
          <p className="text-gray-600 text-sm">
            Card {currentIndex + 1} of {items.length}
          </p>
          {score.total > 0 && (
            <p className="text-indigo-600 font-semibold mt-2">
              Score: {score.correct}/{score.total} ({Math.round((score.correct / score.total) * 100)}%)
            </p>
          )}
        </div>
        
        <FlashCard item={items[currentIndex]} isVocab={isVocabMode} />
        
        <AnswerForm
          userAnswer={userAnswer}
          feedback={feedback}
          item={items[currentIndex]}
          isVocab={isVocabMode}
          inputRef={inputRef}
          onAnswerChange={setUserAnswer}
          onSubmit={handleSubmit}
        />
        
        <NavigationButtons
          onPrevious={handlePrevious}
          onNext={handleNext}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}
