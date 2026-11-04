import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { LangContext } from './context';
import { strings, type Lang } from './strings';

const STORAGE_KEY = 'catrina-lang';



function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'fr' || saved === 'en') return saved;
  } catch {
    /* storage unavailable */
  }
  // French is the everyday language for most visitors in Monastir
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'fr';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const t = strings[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable */
    }
  }, [lang, t]);

  const value = useMemo(() => ({ lang, t, setLang }), [lang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
