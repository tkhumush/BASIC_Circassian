import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { TargetLang } from '../data/words';

const LANG_STORAGE_KEY = 'adigabza_lang';

interface LangContextValue {
  lang: TargetLang;
  toggleLang: () => void;
  setLang: (lang: TargetLang) => void;
  isArabic: boolean;
}

const LangContext = createContext<LangContextValue | null>(null);

function loadLang(): TargetLang {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === 'ar' || stored === 'en') return stored;
  } catch { /* ignore */ }
  return 'en';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<TargetLang>(loadLang);

  const setLang = useCallback((l: TargetLang) => {
    setLangState(l);
    try { localStorage.setItem(LANG_STORAGE_KEY, l); } catch { /* ignore */ }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'en' ? 'ar' : 'en');
  }, [lang, setLang]);

  return (
    <LangContext.Provider value={{ lang, toggleLang, setLang, isArabic: lang === 'ar' }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be inside LangProvider');
  return ctx;
}
