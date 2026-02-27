import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { type KeyPair } from '../nostr/keys';

type Step = 'welcome' | 'create' | 'backup' | 'login' | 'profile';

export function Welcome({ onComplete }: { onComplete: () => void }) {
  const { generateAccount, loginWithNsec, loginWithExtension, setProfile } = useAuth();
  const [step, setStep] = useState<Step>('welcome');
  const [newKeys, setNewKeys] = useState<KeyPair | null>(null);
  const [nsecInput, setNsecInput] = useState('');
  const [error, setError] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [backedUp, setBackedUp] = useState(false);
  const [showNsec, setShowNsec] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCreate = () => {
    const kp = generateAccount();
    setNewKeys(kp);
    setStep('backup');
  };

  const handleNsecLogin = () => {
    setError('');
    try {
      loginWithNsec(nsecInput.trim());
      setStep('profile');
    } catch {
      setError('Invalid nsec key. Make sure it starts with "nsec1"');
    }
  };

  const handleExtensionLogin = async () => {
    setError('');
    try {
      await loginWithExtension();
      onComplete();
    } catch {
      setError('No Nostr extension found. Install a NIP-07 extension like nos2x or Alby.');
    }
  };

  const handleCopyNsec = async () => {
    if (newKeys) {
      await navigator.clipboard.writeText(newKeys.nsec);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleProfileDone = () => {
    if (displayName.trim()) {
      setProfile({ display_name: displayName.trim(), name: displayName.trim().toLowerCase().replace(/\s+/g, '') });
    }
    onComplete();
  };

  return (
    <div className="welcome-container">
      {step === 'welcome' && (
        <div className="welcome-card animate-in">
          <div className="welcome-logo">
            <span className="logo-text">Adigabza</span>
            <span className="logo-subtitle">Learn Circassian</span>
          </div>
          <p className="welcome-desc">
            Master 800 core Circassian words through interactive lessons.
            Your progress syncs across devices automatically.
          </p>
          <div className="welcome-buttons">
            <button className="btn btn-primary btn-large" onClick={handleCreate}>
              Get Started
            </button>
            <button className="btn btn-secondary" onClick={() => setStep('login')}>
              I have an account
            </button>
          </div>
        </div>
      )}

      {step === 'backup' && newKeys && (
        <div className="welcome-card animate-in">
          <h2>Save Your Secret Key</h2>
          <p className="backup-warning">
            This is your account key. Save it somewhere safe — it's the only way to recover your account.
          </p>
          <div className="nsec-display">
            <code className="nsec-text">
              {showNsec ? newKeys.nsec : '••••••••••••••••••••••••••••••••••••••••'}
            </code>
            <div className="nsec-actions">
              <button className="btn btn-small" onClick={() => setShowNsec(!showNsec)}>
                {showNsec ? 'Hide' : 'Show'}
              </button>
              <button className="btn btn-small" onClick={handleCopyNsec}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={backedUp}
              onChange={e => setBackedUp(e.target.checked)}
            />
            I've saved my key somewhere safe
          </label>
          <button
            className="btn btn-primary"
            onClick={() => setStep('profile')}
            disabled={!backedUp}
          >
            Continue
          </button>
        </div>
      )}

      {step === 'login' && (
        <div className="welcome-card animate-in">
          <h2>Welcome Back</h2>
          <div className="login-options">
            <div className="login-section">
              <label>Paste your secret key</label>
              <input
                type="password"
                placeholder="nsec1..."
                value={nsecInput}
                onChange={e => setNsecInput(e.target.value)}
                className="input-field"
              />
              <button
                className="btn btn-primary"
                onClick={handleNsecLogin}
                disabled={!nsecInput.trim()}
              >
                Login
              </button>
            </div>

            <div className="login-divider">
              <span>or</span>
            </div>

            <button className="btn btn-extension" onClick={handleExtensionLogin}>
              <span className="extension-icon">🔐</span>
              Login with Browser Extension
            </button>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button className="btn btn-link" onClick={() => setStep('welcome')}>
            Back
          </button>
        </div>
      )}

      {step === 'profile' && (
        <div className="welcome-card animate-in">
          <h2>What should we call you?</h2>
          <input
            type="text"
            placeholder="Your name"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            className="input-field"
            maxLength={50}
            autoFocus
          />
          <div className="profile-buttons">
            <button className="btn btn-primary" onClick={handleProfileDone}>
              {displayName.trim() ? 'Start Learning' : 'Skip for now'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
