import { ModeSelector } from './components/ModeSelector';
import { FlashCard } from './components/FlashCard';
import { AnswerForm } from './components/AnswerForm';
import { NavigationButtons } from './components/NavigationButtons';
import { useKanaQuiz } from './hooks/useKanaQuiz';

export default function App() {
  const {
    mode,
    characters,
    currentIndex,
    userAnswer,
    feedback,
    score,
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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Kana Practice</h1>
          
          <ModeSelector mode={mode} onModeChange={handleModeChange} />

          <p className="text-gray-600 text-sm">
            Card {currentIndex + 1} of {characters.length}
          </p>
          {score.total > 0 && (
            <p className="text-indigo-600 font-semibold mt-2">
              Score: {score.correct}/{score.total} ({Math.round((score.correct / score.total) * 100)}%)
            </p>
          )}
        </div>

        <FlashCard character={characters[currentIndex]} />

        <AnswerForm
          userAnswer={userAnswer}
          feedback={feedback}
          character={characters[currentIndex]}
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
