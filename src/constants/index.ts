import { Language, Difficulty } from '../types';

export const LANGUAGES: Language[] = [
  { id: 'en', name: 'English', code: 'en-US' },
  { id: 'es', name: 'Spanish', code: 'es-ES' },
  { id: 'fr', name: 'French', code: 'fr-FR' },
  { id: 'de', name: 'German', code: 'de-DE' },
  { id: 'it', name: 'Italian', code: 'it-IT' },
  { id: 'zh', name: 'Mandarin', code: 'zh-CN' },
];

export const DIFFICULTIES: Difficulty[] = [
  { id: 'easy', name: 'Easy', speedMultiplier: 1 },
  { id: 'medium', name: 'Medium', speedMultiplier: 1.5 },
  { id: 'hard', name: 'Hard', speedMultiplier: 2 },
];

export const PHONE_NUMBER_LENGTHS = [7, 10, 11];

export const POINTS = {
  correct: 10,
  incorrect: 0,
};

export const DELAY_BETWEEN_NUMBERS = 1000; // Base delay in milliseconds 