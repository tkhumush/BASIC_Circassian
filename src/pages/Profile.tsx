import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import { publishProfile, publishProfileWithExtension } from '../nostr/profile';
import { words } from '../data/words';

interface ProfileProps {
  onBack: () => void;
}

export function Profile({ onBack }: ProfileProps) {
  const { keyPair, pubkey, loginMethod, profile, setProfile, logout } = useAuth();
  const { progress, syncToNostr, isSyncing } = useProgress();
  const [editName, setEditName] = useState(profile?.display_name || '');
  const [saving, setSaving] = useState(false);
  const [showNsec, setShowNsec] = useState(false);
  const [copied, setCopied] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const totalWords = words.length;
  const learnedCount = Object.values(progress.assessments).filter(a => a.level >= 2).length;
  const masteredCount = Object.values(progress.assessments).filter(a => a.level >= 4).length;

  const handleSaveProfile = async () => {
    const newProfile = { ...profile, display_name: editName.trim(), name: editName.trim().toLowerCase().replace(/\s+/g, '') };
    setSaving(true);
    try {
      if (loginMethod === 'extension') {
        await publishProfileWithExtension(newProfile);
      } else if (keyPair?.secretKey) {
        await publishProfile(newProfile, keyPair.secretKey);
      }
      setProfile(newProfile);
    } catch (e) {
      console.warn('Failed to save profile:', e);
      // Still update locally
      setProfile(newProfile);
    }
    setSaving(false);
  };

  const handleCopy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleLogout = () => {
    logout();
    onBack();
  };

  return (
    <div className="profile-container">
      <header className="learn-header">
        <button className="btn btn-back" onClick={onBack}>Back</button>
        <h2>Profile</h2>
        <div />
      </header>

      <div className="profile-card">
        <div className="profile-avatar">
          {profile?.display_name?.[0]?.toUpperCase() || '?'}
        </div>

        <div className="profile-field">
          <label>Display Name</label>
          <div className="profile-edit-row">
            <input
              type="text"
              value={editName}
              onChange={e => setEditName(e.target.value)}
              className="input-field"
              placeholder="Your name"
              maxLength={50}
            />
            <button
              className="btn btn-small btn-primary"
              onClick={handleSaveProfile}
              disabled={saving || !editName.trim()}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {keyPair && (
          <>
            <div className="profile-field">
              <label>Public Key</label>
              <div className="key-display">
                <code className="key-text">{keyPair.npub.slice(0, 20)}...{keyPair.npub.slice(-8)}</code>
                <button
                  className="btn btn-small"
                  onClick={() => handleCopy(keyPair.npub, 'npub')}
                >
                  {copied === 'npub' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="profile-field">
              <label>Secret Key</label>
              <div className="key-display">
                <code className="key-text">
                  {showNsec ? keyPair.nsec : '••••••••••••••••••••'}
                </code>
                <button className="btn btn-small" onClick={() => setShowNsec(!showNsec)}>
                  {showNsec ? 'Hide' : 'Show'}
                </button>
                <button
                  className="btn btn-small"
                  onClick={() => handleCopy(keyPair.nsec, 'nsec')}
                >
                  {copied === 'nsec' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="key-warning">Never share your secret key with anyone!</p>
            </div>
          </>
        )}

        {loginMethod === 'extension' && pubkey && (
          <div className="profile-field">
            <label>Logged in via extension</label>
            <code className="key-text">{pubkey.slice(0, 16)}...{pubkey.slice(-8)}</code>
          </div>
        )}
      </div>

      <div className="profile-stats-card">
        <h3>Your Progress</h3>
        <div className="profile-stats-grid">
          <div className="profile-stat">
            <span className="profile-stat-value">{learnedCount}</span>
            <span className="profile-stat-label">Words Learned</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-value">{masteredCount}</span>
            <span className="profile-stat-label">Mastered</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-value">{progress.xp}</span>
            <span className="profile-stat-label">Total XP</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-value">{progress.streakDays}</span>
            <span className="profile-stat-label">Day Streak</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-value">{Math.round((learnedCount / totalWords) * 100)}%</span>
            <span className="profile-stat-label">Complete</span>
          </div>
        </div>

        <button
          className="btn btn-secondary sync-btn"
          onClick={syncToNostr}
          disabled={isSyncing}
        >
          {isSyncing ? 'Syncing...' : 'Sync Progress Now'}
        </button>
      </div>

      <div className="profile-danger">
        {!showLogoutConfirm ? (
          <button className="btn btn-danger" onClick={() => setShowLogoutConfirm(true)}>
            Log Out
          </button>
        ) : (
          <div className="logout-confirm">
            <p>Make sure you've saved your secret key before logging out!</p>
            <div className="logout-buttons">
              <button className="btn btn-danger" onClick={handleLogout}>Yes, Log Out</button>
              <button className="btn btn-secondary" onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
