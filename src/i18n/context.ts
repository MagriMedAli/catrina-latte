import { createContext } from 'react';
import type { Lang, Strings } from './strings';

export type LangValue = { lang: Lang; t: Strings; setLang: (l: Lang) => void };

export const LangContext = createContext<LangValue | null>(null);
