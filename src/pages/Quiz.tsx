import { useState, useMemo, useCallback } from 'react';
import { getWordsByCategory, categories, type Word } from '../data/words';
import { useProgress } from '../hooks/useProgress';

interface QuizProps {
  categoryId: string;
  onBack: () => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface QuizQuestion {
  word: Word;
  options: string[];
  correctIndex: number;
  mode: 'circToEng' | 'engToCirc';
}

function generateQuestions(catWords: Word[], allWords: Word[]): QuizQuestion[] {
  const shuffled = shuffleArray(catWords);
  return shuffled.map(word => {
    const mode = Math.random() > 0.5 ? 'circToEng' : 'engToCirc';

    // Get 3 wrong answers from the same category if possible, else from all words
    const others = catWords.filter(w => w.index !== word.index);
    const pool = others.length >= 3 ? others : allWords.filter(w => w.index !== word.index);
    const wrongAnswers = shuffleArray(pool).slice(0, 3);

    if (mode === 'circToEng') {
      const allOptions = shuffleArray([word.english, ...wrongAnswers.map(w => w.english)]);
      return {
        word,
        options: allOptions,
        correctIndex: allOptions.indexOf(word.english),
        mode,
      };
    } else {
      const allOptions = shuffleArray([word.circassian, ...wrongAnswers.map(w => w.circassian)]);
      return {
        word,
        options: allOptions,
        correctIndex: allOptions.indexOf(word.circassian),
        mode,
      };
    }
  });
}

export function Quiz({ categoryId, onBack }: QuizProps) {
  const catWords = getWordsByCategory(categoryId);
  const category = categories.find(c => c.id === categoryId);
  const { updateWordAssessment } = useProgress();
  const allCatWords = catWords;

  const questions = useMemo(
    () => generateQuestions(catWords, allCatWords),
    [categoryId], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[qIdx];

  const handleSelect = useCallback((optIdx: number) => {
    if (selected !== null) return;
    setSelected(optIdx);
    const correct = optIdx === q.correctIndex;
    if (correct) setScore(s => s + 1);
    updateWordAssessment(q.word.index, correct);
  }, [selected, q, updateWordAssessment]);

  const handleNext = useCallback(() => {
    if (qIdx < questions.length - 1) {
      setQIdx(i => i + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }, [qIdx, questions.length]);

  if (finished) {
    const percent = Math.round((score / questions.length) * 100);
    const emoji = percent >= 80 ? '🎉' : percent >= 50 ? '👍' : '💪';
    return (
      <div className="quiz-container">
        <div className="quiz-results animate-in">
          <span className="results-emoji">{emoji}</span>
          <h2>Quiz Complete!</h2>
          <div className="results-score">
            <span className="score-big">{score}/{questions.length}</span>
            <span className="score-percent">{percent}%</span>
          </div>
          <div className="results-buttons">
            <button className="btn btn-primary" onClick={onBack}>Continue</button>
          </div>
        </div>
      </div>
    );
  }

  if (!q) return null;

  return (
    <div className="quiz-container">
      <header className="learn-header">
        <button className="btn btn-back" onClick={onBack}>Back</button>
        <h2>{category?.emoji} Quiz</h2>
        <span className="learn-counter">{qIdx + 1}/{questions.length}</span>
      </header>

      <div className="learn-progress-bar">
        <div
          className="learn-progress-fill"
          style={{
            width: `${((qIdx + 1) / questions.length) * 100}%`,
            backgroundColor: category?.color,
          }}
        />
      </div>

      <div className="quiz-question animate-in">
        <p className="quiz-prompt">
          {q.mode === 'circToEng' ? 'What does this mean?' : 'Which is the Circassian word for:'}
        </p>
        <div className="quiz-word">
          {q.mode === 'circToEng' ? (
            <>
              <span className="word-circassian">{q.word.circassian}</span>
              <span className="word-pronunciation">{q.word.pronunciation}</span>
            </>
          ) : (
            <span className="word-english-large">{q.word.english}</span>
          )}
        </div>
      </div>

      <div className="quiz-options">
        {q.options.map((opt, i) => {
          let optClass = 'quiz-option';
          if (selected !== null) {
            if (i === q.correctIndex) optClass += ' correct';
            else if (i === selected) optClass += ' wrong';
          }
          return (
            <button
              key={i}
              className={optClass}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="quiz-next animate-in">
          <button className="btn btn-primary" onClick={handleNext}>
            {qIdx < questions.length - 1 ? 'Next' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
}
