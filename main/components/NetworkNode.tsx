import React from 'react';
import { Sphere } from '@react-three/drei';
import { useNetworkStore } from '../store/networkStore';

interface NetworkNodeProps {
  nodeId: string;
  position: [number, number, number];
  hasAgent: boolean;
}

export const NetworkNode: React.FC<NetworkNodeProps> = ({ nodeId, position, hasAgent }) => {
  const addAgent = useNetworkStore((state) => state.addAgent);
  const removeAgent = useNetworkStore((state) => state.removeAgent);

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (hasAgent) {
      removeAgent(nodeId);
    } else {
      addAgent(nodeId);
    }
  };

  return (
    <Sphere position={position} args={[0.2, 16, 16]} onClick={handleClick}>
      <meshStandardMaterial
        color={hasAgent ? '#ff6b6b' : '#4dabf7'}
        emissive={hasAgent ? '#ff6b6b' : '#4dabf7'}
        emissiveIntensity={hasAgent ? 0.5 : 0.2}
      />
    </Sphere>
  );
};