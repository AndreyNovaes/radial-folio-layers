
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="text-6xl animate-spin">🍗</div>
      <p className="text-purple-300 text-lg font-semibold">Invocando o frango...</p>
    </div>
  );
};

export default LoadingSpinner;
