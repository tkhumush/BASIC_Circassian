import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import { categories, words, getWordsByCategory } from '../data/words';

interface HomeProps {
  onStartCategory: (categoryId: string) => void;
  onStartQuiz: (categoryId: string) => void;
  onShowProfile: () => void;
}

export function Home({ onStartCategory, onStartQuiz, onShowProfile }: HomeProps) {
  const { profile } = useAuth();
  const { progress } = useProgress();

  const totalWords = words.length;
  const learnedCount = Object.values(progress.assessments).filter(a => a.level >= 2).length;
  const masteredCount = Object.values(progress.assessments).filter(a => a.level >= 4).length;
  const progressPercent = Math.round((learnedCount / totalWords) * 100);

  const getCategoryProgress = (catId: string) => {
    const catWords = getWordsByCategory(catId);
    const learned = catWords.filter(w => progress.assessments[w.index]?.level >= 2).length;
    return { learned, total: catWords.length };
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-left">
          <h1 className="app-title">Adigabza</h1>
          <span className="header-subtitle">Circassian</span>
        </div>
        <button className="avatar-btn" onClick={onShowProfile}>
          {profile?.display_name?.[0]?.toUpperCase() || '?'}
        </button>
      </header>

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-value">{learnedCount}</span>
          <span className="stat-label">words learned</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{masteredCount}</span>
          <span className="stat-label">mastered</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{progress.xp}</span>
          <span className="stat-label">XP</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{progress.streakDays}</span>
          <span className="stat-label">day streak</span>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <span className="progress-text">{progressPercent}% complete — {learnedCount}/{totalWords} words</span>
      </div>

      <h2 className="section-title">Categories</h2>
      <div className="category-grid">
        {categories.map(cat => {
          const { learned, total } = getCategoryProgress(cat.id);
          const isComplete = learned === total;

          return (
            <div
              key={cat.id}
              className={`category-card ${isComplete ? 'complete' : ''}`}
              style={{ '--cat-color': cat.color } as React.CSSProperties}
            >
              <div className="cat-header">
                <span className="cat-emoji">{cat.emoji}</span>
                <span className="cat-progress">{learned}/{total}</span>
              </div>
              <h3 className="cat-name">{cat.name}</h3>
              <div className="cat-bar">
                <div
                  className="cat-bar-fill"
                  style={{ width: `${(learned / total) * 100}%` }}
                />
              </div>
              <div className="cat-actions">
                <button className="btn btn-cat-learn" onClick={() => onStartCategory(cat.id)}>
                  Learn
                </button>
                {learned > 0 && (
                  <button className="btn btn-cat-quiz" onClick={() => onStartQuiz(cat.id)}>
                    Quiz
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
