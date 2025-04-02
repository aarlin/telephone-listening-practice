export interface Language {
  id: string;
  name: string;
  code: string;
}

export interface Difficulty {
  id: 'easy' | 'medium' | 'hard';
  name: string;
  speedMultiplier: number;
}

export interface GameSettings {
  language: Language;
  difficulty: Difficulty;
  phoneNumberLength: number;
}

export interface GameState {
  currentNumber: string;
  userInput: string;
  score: number;
  isCorrect: boolean | null;
  isPlaying: boolean;
} 