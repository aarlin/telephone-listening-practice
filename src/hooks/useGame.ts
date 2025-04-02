import { useState, useEffect, useCallback } from 'react';
import { GameSettings, GameState } from '../types';
import { POINTS, DELAY_BETWEEN_NUMBERS } from '../constants';

export const useGame = (settings: GameSettings) => {
  const [gameState, setGameState] = useState<GameState>({
    currentNumber: '',
    userInput: '',
    score: 0,
    isCorrect: null,
    isPlaying: false,
  });

  const generatePhoneNumber = useCallback(() => {
    const length = settings.phoneNumberLength;
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
  }, [settings.phoneNumberLength]);

  const playNumber = useCallback(async (number: string) => {
    const utterance = new SpeechSynthesisUtterance(number);
    utterance.lang = settings.language.code;
    utterance.rate = settings.difficulty.speedMultiplier;
    
    return new Promise<void>((resolve) => {
      utterance.onend = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  }, [settings.language.code, settings.difficulty.speedMultiplier]);

  const startGame = useCallback(async () => {
    const phoneNumber = generatePhoneNumber();
    setGameState(prev => ({
      ...prev,
      currentNumber: phoneNumber,
      userInput: '',
      isCorrect: null,
      isPlaying: true,
    }));

    for (const digit of phoneNumber) {
      await playNumber(digit);
      await new Promise(resolve => 
        setTimeout(resolve, DELAY_BETWEEN_NUMBERS / settings.difficulty.speedMultiplier)
      );
    }

    setGameState(prev => ({ ...prev, isPlaying: false }));
  }, [generatePhoneNumber, playNumber, settings.difficulty.speedMultiplier]);

  const checkAnswer = useCallback((input: string) => {
    const isCorrect = input === gameState.currentNumber;
    setGameState(prev => ({
      ...prev,
      isCorrect,
      score: prev.score + (isCorrect ? POINTS.correct : POINTS.incorrect),
    }));
  }, [gameState.currentNumber]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      checkAnswer(gameState.userInput);
    }
  }, [gameState.userInput, checkAnswer]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= settings.phoneNumberLength) {
      setGameState(prev => ({
        ...prev,
        userInput: value,
      }));
    }
  }, [settings.phoneNumberLength]);

  return {
    gameState,
    startGame,
    handleInputChange,
  };
}; 