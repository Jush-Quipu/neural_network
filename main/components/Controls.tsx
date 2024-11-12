import React from 'react';
import { RefreshCw } from 'lucide-react';
import { useNetworkStore } from '../store/networkStore';

export const Controls: React.FC = () => {
  const resetNetwork = useNetworkStore((state) => state.resetNetwork);

  return (
    <div className="fixed top-4 right-4 z-10">
      <button
        onClick={resetNetwork}
        className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg 
                 flex items-center gap-2 text-white hover:bg-white/20 
                 transition-colors duration-200"
      >
        <RefreshCw size={20} />
        Reset Network
      </button>
    </div>
  );
};