import { useState, useMemo, useCallback } from 'react';
import { getWordsByCategory, categories, getMeaning, type Word, type TargetLang } from '../data/words';
import { useProgress } from '../hooks/useProgress';
import { useLang } from '../hooks/useLang';

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
  mode: 'circToTarget' | 'targetToCirc';
}

function generateQuestions(catWords: Word[], allWords: Word[], lang: TargetLang): QuizQuestion[] {
  const shuffled = shuffleArray(catWords);
  return shuffled.map(word => {
    const mode = Math.random() > 0.5 ? 'circToTarget' : 'targetToCirc';

    const others = catWords.filter(w => w.index !== word.index);
    const pool = others.length >= 3 ? others : allWords.filter(w => w.index !== word.index);
    const wrongAnswers = shuffleArray(pool).slice(0, 3);

    if (mode === 'circToTarget') {
      const correct = getMeaning(word, lang);
      const allOptions = shuffleArray([correct, ...wrongAnswers.map(w => getMeaning(w, lang))]);
      return {
        word,
        options: allOptions,
        correctIndex: allOptions.indexOf(correct),
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
  const { lang, isArabic } = useLang();

  const questions = useMemo(
    () => generateQuestions(catWords, catWords, lang),
    [categoryId, lang], // eslint-disable-line react-hooks/exhaustive-deps
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
      <div className={`quiz-container ${isArabic ? 'rtl' : ''}`}>
        <div className="quiz-results animate-in">
          <span className="results-emoji">{emoji}</span>
          <h2>{isArabic ? 'انتهى الاختبار!' : 'Quiz Complete!'}</h2>
          <div className="results-score">
            <span className="score-big">{score}/{questions.length}</span>
            <span className="score-percent">{percent}%</span>
          </div>
          <div className="results-buttons">
            <button className="btn btn-primary" onClick={onBack}>
              {isArabic ? 'متابعة' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!q) return null;

  return (
    <div className={`quiz-container ${isArabic ? 'rtl' : ''}`}>
      <header className="learn-header">
        <button className="btn btn-back" onClick={onBack}>
          {isArabic ? 'رجوع' : 'Back'}
        </button>
        <h2>{category?.emoji} {isArabic ? 'اختبار' : 'Quiz'}</h2>
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
          {q.mode === 'circToTarget'
            ? (isArabic ? 'ما معنى هذه الكلمة؟' : 'What does this mean?')
            : (isArabic ? 'ما الكلمة الشركسية لـ:' : 'Which is the Circassian word for:')}
        </p>
        <div className="quiz-word">
          {q.mode === 'circToTarget' ? (
            <>
              <span className="word-circassian">{q.word.circassian}</span>
              <span className="word-pronunciation">{q.word.pronunciation}</span>
            </>
          ) : (
            <span className={`word-english-large ${isArabic ? 'arabic-text' : ''}`}>
              {getMeaning(q.word, lang)}
            </span>
          )}
        </div>
      </div>

      <div className="quiz-options">
        {q.options.map((opt, i) => {
          let optClass = 'quiz-option';
          if (q.mode === 'circToTarget' && isArabic) optClass += ' arabic-text';
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
            {qIdx < questions.length - 1
              ? (isArabic ? 'التالي' : 'Next')
              : (isArabic ? 'النتائج' : 'See Results')}
          </button>
        </div>
      )}
    </div>
  );
}
