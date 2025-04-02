import { useState } from 'react';
import { useGame } from '../hooks/useGame';
import { LANGUAGES, DIFFICULTIES, PHONE_NUMBER_LENGTHS } from '../constants';
import type { GameSettings } from '../types';
import { NumericFormat } from 'react-number-format';

export const Game = () => {
  const [settings, setSettings] = useState<GameSettings>({
    language: LANGUAGES[0],
    difficulty: DIFFICULTIES[0],
    phoneNumberLength: PHONE_NUMBER_LENGTHS[0],
  });

  const { gameState, startGame, handleInputChange } = useGame(settings);

  const handleStart = async () => {
    await startGame();
  };

  const handleLanguageChange = (languageId: string) => {
    const language = LANGUAGES.find(l => l.id === languageId);
    if (language) {
      setSettings(prev => ({ ...prev, language }));
    }
  };

  const handleDifficultyChange = (difficultyId: string) => {
    const difficulty = DIFFICULTIES.find(d => d.id === difficultyId);
    if (difficulty) {
      setSettings(prev => ({ ...prev, difficulty }));
    }
  };

  const handleLengthChange = (length: number) => {
    setSettings(prev => ({ ...prev, phoneNumberLength: length }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center justify-center space-y-8">
          <h1 className="text-4xl font-bold text-center text-gray-800">Phone Number Listening Practice</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full items-center justify-center">
            <select
              className="w-full sm:w-48 px-4 py-2 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
              value={settings.language.id}
              onChange={(e) => handleLanguageChange(e.target.value)}
            >
              {LANGUAGES.map(lang => (
                <option key={lang.id} value={lang.id} className="text-center">
                  {lang.name}
                </option>
              ))}
            </select>

            <select
              className="w-full sm:w-48 px-4 py-2 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
              value={settings.difficulty.id}
              onChange={(e) => handleDifficultyChange(e.target.value)}
            >
              {DIFFICULTIES.map(diff => (
                <option key={diff.id} value={diff.id} className="text-center">
                  {diff.name}
                </option>
              ))}
            </select>

            <select
              className="w-full sm:w-48 px-4 py-2 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
              value={settings.phoneNumberLength}
              onChange={(e) => handleLengthChange(Number(e.target.value))}
            >
              {PHONE_NUMBER_LENGTHS.map(length => (
                <option key={length} value={length} className="text-center">
                  {length} digits
                </option>
              ))}
            </select>
          </div>

          <div className="p-8 border rounded-lg w-full text-center bg-gray-50 flex flex-col items-center justify-center">
            <p className="text-2xl mb-6 text-gray-700">
              Score: {gameState.score}
            </p>
            
            <div className="w-full max-w-md">
              <NumericFormat
                value={gameState.userInput}
                onValueChange={(values) => handleInputChange({ target: { value: values.value } } as React.ChangeEvent<HTMLInputElement>)}
                allowNegative={false}
                decimalScale={0}
                isAllowed={(values) => {
                  const { floatValue } = values;
                  return floatValue === undefined || floatValue.toString().length <= settings.phoneNumberLength;
                }}
                className="w-full px-6 py-4 text-5xl font-mono text-gray-800 bg-white border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center transition-all duration-200"
                placeholder="Type the number..."
              />
            </div>

            {gameState.isCorrect !== null && (
              <p
                className={`text-2xl mb-4 font-semibold ${
                  gameState.isCorrect ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {gameState.isCorrect ? '✓ Correct!' : '✗ Try again!'}
              </p>
            )}
          </div>

          <button
            type="button"
            className={`w-full sm:w-64 px-8 py-4 text-xl font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors shadow-md flex items-center justify-center ${
              gameState.isPlaying ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleStart}
            disabled={gameState.isPlaying}
          >
            {gameState.isPlaying ? 'Playing...' : 'Start New Number'}
          </button>
        </div>
      </div>
    </div>
  );
}; 