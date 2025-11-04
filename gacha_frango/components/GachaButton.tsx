
import React from 'react';

interface GachaButtonProps {
  onClick: () => void;
  isLoading: boolean;
  rollsLeft: number;
}

const GachaButton: React.FC<GachaButtonProps> = ({ onClick, isLoading, rollsLeft }) => {
  const isDisabled = isLoading || rollsLeft === 0;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        w-full max-w-md px-8 py-4 mt-8
        text-2xl font-bold text-white
        rounded-xl
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-4
        disabled:cursor-not-allowed disabled:bg-gray-600 disabled:shadow-none
        ${isLoading
          ? 'bg-purple-900 animate-pulse'
          : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-purple-500/50 focus:ring-purple-400'
        }
      `}
    >
      {isLoading ? 'Cozinhando...' : `Puxar Frango! (${rollsLeft} / 100)`}
    </button>
  );
};

export default GachaButton;
