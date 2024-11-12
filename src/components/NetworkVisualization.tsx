import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { NetworkNode } from './NetworkNode';
import { NetworkLink } from './NetworkLink';
import { useNetworkStore } from '../store/networkStore';

export const NetworkVisualization: React.FC = () => {
  const { nodes, links } = useNetworkStore();

  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 15]} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={50}
      />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Core Light Source */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#ffd43b"
          emissive="#ffd43b"
          emissiveIntensity={2}
        />
      </mesh>
      
      {/* Nodes */}
      {nodes.map((node) => (
        <NetworkNode
          key={node.id}
          nodeId={node.id}
          position={[node.position.x, node.position.y, node.position.z]}
          hasAgent={node.hasAgent}
        />
      ))}
      
      {/* Links */}
      {links.map((link) => {
        const sourceNode = nodes.find((n) => n.id === link.source);
        const targetNode = nodes.find((n) => n.id === link.target);
        
        if (!sourceNode || !targetNode) return null;
        
        return (
          <NetworkLink
            key={link.id}
            linkId={link.id}
            start={sourceNode.position}
            end={targetNode.position}
            active={link.active}
          />
        );
      })}
    </Canvas>
  );
};