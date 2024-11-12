import React from 'react';
import { NetworkVisualization } from './components/NetworkVisualization';
import { Controls } from './components/Controls';

function App() {
  return (
    <div className="w-full h-screen bg-gray-900">
      <Controls />
      <NetworkVisualization />
    </div>
  );
}

export default App;