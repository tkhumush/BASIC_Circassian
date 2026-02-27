import { useState, useCallback } from 'react';
import { getWordsByCategory, categories, getMeaning, getCategoryName, type Word } from '../data/words';
import { useProgress } from '../hooks/useProgress';
import { useLang } from '../hooks/useLang';

interface LearnProps {
  categoryId: string;
  onBack: () => void;
}

export function Learn({ categoryId, onBack }: LearnProps) {
  const catWords = getWordsByCategory(categoryId);
  const category = categories.find(c => c.id === categoryId);
  const { progress, updateWordAssessment } = useProgress();
  const { lang, isArabic } = useLang();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [rated, setRated] = useState(false);
  const [slideDir, setSlideDir] = useState<'left' | 'right' | ''>('');

  const word = catWords[currentIdx];
  if (!word) return null;

  const assessment = progress.assessments[word.index];
  const levelLabels = isArabic
    ? ['جديد', 'شوهد', 'يتعلّم', 'مألوف', 'متقن']
    : ['New', 'Seen', 'Learning', 'Familiar', 'Mastered'];
  const levelLabel = levelLabels[assessment?.level ?? 0];
  const levelColor = ['#999', '#FFB347', '#87CEEB', '#77DD77', '#FFD700'][assessment?.level ?? 0];

  const handleRate = useCallback((correct: boolean) => {
    updateWordAssessment(word.index, correct);
    setRated(true);
  }, [word.index, updateWordAssessment]);

  const nextCard = useCallback(() => {
    if (currentIdx < catWords.length - 1) {
      setSlideDir('left');
      setTimeout(() => {
        setCurrentIdx(i => i + 1);
        setFlipped(false);
        setRated(false);
        setSlideDir('');
      }, 200);
    }
  }, [currentIdx, catWords.length]);

  const prevCard = useCallback(() => {
    if (currentIdx > 0) {
      setSlideDir('right');
      setTimeout(() => {
        setCurrentIdx(i => i - 1);
        setFlipped(false);
        setRated(false);
        setSlideDir('');
      }, 200);
    }
  }, [currentIdx]);

  return (
    <div className={`learn-container ${isArabic ? 'rtl' : ''}`}>
      <header className="learn-header">
        <button className="btn btn-back" onClick={onBack}>
          {isArabic ? 'رجوع' : 'Back'}
        </button>
        <h2>{category?.emoji} {category ? getCategoryName(category, lang) : ''}</h2>
        <span className="learn-counter">{currentIdx + 1}/{catWords.length}</span>
      </header>

      <div className="learn-progress-bar">
        <div
          className="learn-progress-fill"
          style={{
            width: `${((currentIdx + 1) / catWords.length) * 100}%`,
            backgroundColor: category?.color,
          }}
        />
      </div>

      <div className={`flashcard-area ${slideDir}`}>
        <div
          className={`flashcard ${flipped ? 'flipped' : ''}`}
          onClick={() => !flipped && setFlipped(true)}
          style={{ '--card-color': category?.color } as React.CSSProperties}
        >
          <div className="flashcard-front">
            <span className="word-level" style={{ color: levelColor }}>{levelLabel}</span>
            <span className="word-circassian">{word.circassian}</span>
            <span className="word-pronunciation">{word.pronunciation}</span>
            <span className="tap-hint">{isArabic ? 'اضغط للكشف' : 'Tap to reveal'}</span>
          </div>
          <div className="flashcard-back">
            <span className="word-level" style={{ color: levelColor }}>{levelLabel}</span>
            <span className="word-circassian">{word.circassian}</span>
            <span className="word-pronunciation">{word.pronunciation}</span>
            <div className="word-divider" />
            <span className={`word-english ${isArabic ? 'arabic-text' : ''}`}>
              {getMeaning(word, lang)}
            </span>
          </div>
        </div>
      </div>

      {flipped && !rated && (
        <div className="rate-buttons animate-in">
          <button className="btn btn-wrong" onClick={() => handleRate(false)}>
            {isArabic ? 'ما زلت أتعلّم' : 'Still learning'}
          </button>
          <button className="btn btn-correct" onClick={() => handleRate(true)}>
            {isArabic ? 'فهمتها!' : 'Got it!'}
          </button>
        </div>
      )}

      {rated && (
        <div className="nav-buttons animate-in">
          <button className="btn btn-nav" onClick={prevCard} disabled={currentIdx === 0}>
            {isArabic ? 'السابق' : 'Previous'}
          </button>
          {currentIdx < catWords.length - 1 ? (
            <button className="btn btn-nav btn-primary" onClick={nextCard}>
              {isArabic ? 'التالي' : 'Next'}
            </button>
          ) : (
            <button className="btn btn-nav btn-primary" onClick={onBack}>
              {isArabic ? 'تم!' : 'Done!'}
            </button>
          )}
        </div>
      )}

      <WordDots words={catWords} currentIdx={currentIdx} assessments={progress.assessments} />
    </div>
  );
}

function WordDots({ words, currentIdx, assessments }: {
  words: Word[];
  currentIdx: number;
  assessments: Record<number, { level: number }>;
}) {
  return (
    <div className="word-dots">
      {words.map((w, i) => {
        const level = assessments[w.index]?.level ?? 0;
        const dotColor = ['#ddd', '#FFB347', '#87CEEB', '#77DD77', '#FFD700'][level];
        return (
          <div
            key={w.index}
            className={`word-dot ${i === currentIdx ? 'active' : ''}`}
            style={{ backgroundColor: dotColor }}
          />
        );
      })}
    </div>
  );
}
