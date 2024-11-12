import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { NetworkNode } from './NetworkNode';
import { NetworkLink } from './NetworkLink';
import { useNetworkStore } from '../store/networkStore';

const CoreLight = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.scale.x = 1 + Math.sin(clock.getElapsedTime()) * 0.1;
      ref.current.scale.y = 1 + Math.sin(clock.getElapsedTime()) * 0.1;
      ref.current.scale.z = 1 + Math.sin(clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#ffd43b"
        emissive="#ffd43b"
        emissiveIntensity={2}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

const Scene = () => {
  const { nodes, links } = useNetworkStore();

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4dabf7" />
      
      <CoreLight />
      
      <fog attach="fog" args={['#000', 15, 25]} />
      
      {nodes.map((node) => (
        <NetworkNode
          key={node.id}
          nodeId={node.id}
          position={[node.position.x, node.position.y, node.position.z]}
          hasAgent={node.hasAgent}
        />
      ))}
      
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
    </>
  );
};

const LoadingScreen = () => (
  <div className="absolute inset-0 flex items-center justify-center text-white">
    <div className="text-xl font-semibold">Loading Neural Network...</div>
  </div>
);

export const NetworkVisualization: React.FC = () => {
  return (
    <>
      <Canvas dpr={[1, 2]} style={{ background: 'rgb(17, 24, 39)' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
          autoRotate
          autoRotateSpeed={0.5}
        />
        
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <LoadingScreen />
    </>
  );
};
