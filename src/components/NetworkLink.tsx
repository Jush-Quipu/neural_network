import React, { useMemo } from 'react';
import { Line } from '@react-three/drei';
import { Vector3 } from 'three';
import { useNetworkStore } from '../store/networkStore';

interface NetworkLinkProps {
  linkId: string;
  start: Vector3;
  end: Vector3;
  active: boolean;
}

export const NetworkLink: React.FC<NetworkLinkProps> = ({ linkId, start, end, active }) => {
  const toggleLink = useNetworkStore((state) => state.toggleLink);

  const points = useMemo(() => [start, end], [start, end]);

  const handleClick = (e: any) => {
    e.stopPropagation();
    toggleLink(linkId);
  };

  return (
    <Line
      points={points}
      color={active ? '#4dabf7' : '#868e96'}
      lineWidth={1}
      onClick={handleClick}
      transparent
      opacity={active ? 0.6 : 0.2}
    />
  );
};