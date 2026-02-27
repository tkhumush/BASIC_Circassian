import { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { ProgressProvider } from './hooks/useProgress';
import { Welcome } from './pages/Welcome';
import { Home } from './pages/Home';
import { Learn } from './pages/Learn';
import { Quiz } from './pages/Quiz';
import { Profile } from './pages/Profile';
import './styles/app.css';

type Page =
  | { name: 'home' }
  | { name: 'learn'; categoryId: string }
  | { name: 'quiz'; categoryId: string }
  | { name: 'profile' };

function AppInner() {
  const { pubkey, isLoading } = useAuth();
  const [page, setPage] = useState<Page>({ name: 'home' });
  const [onboarded, setOnboarded] = useState(false);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-logo">Adigabza</div>
        <div className="loading-spinner" />
      </div>
    );
  }

  if (!pubkey && !onboarded) {
    return <Welcome onComplete={() => setOnboarded(true)} />;
  }

  return (
    <ProgressProvider>
      {page.name === 'home' && (
        <Home
          onStartCategory={id => setPage({ name: 'learn', categoryId: id })}
          onStartQuiz={id => setPage({ name: 'quiz', categoryId: id })}
          onShowProfile={() => setPage({ name: 'profile' })}
        />
      )}
      {page.name === 'learn' && (
        <Learn categoryId={page.categoryId} onBack={() => setPage({ name: 'home' })} />
      )}
      {page.name === 'quiz' && (
        <Quiz categoryId={page.categoryId} onBack={() => setPage({ name: 'home' })} />
      )}
      {page.name === 'profile' && (
        <Profile onBack={() => setPage({ name: 'home' })} />
      )}
    </ProgressProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

export default App;
