import { create } from 'zustand';
import { Vector3 } from 'three';

interface Node {
  id: string;
  position: Vector3;
  hasAgent: boolean;
  connections: string[];
}

interface Link {
  id: string;
  source: string;
  target: string;
  active: boolean;
}

interface NetworkState {
  nodes: Node[];
  links: Link[];
  initialState: {
    nodes: Node[];
    links: Link[];
  };
  addAgent: (nodeId: string) => void;
  removeAgent: (nodeId: string) => void;
  toggleLink: (linkId: string) => void;
  resetNetwork: () => void;
}

const generateInitialNetwork = () => {
  const nodes: Node[] = [];
  const links: Link[] = [];
  
  // Generate nodes in a sphere formation
  for (let i = 0; i < 50; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 5 + Math.random() * 3;
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    
    nodes.push({
      id: `node-${i}`,
      position: new Vector3(x, y, z),
      hasAgent: false,
      connections: [],
    });
  }
  
  // Generate links between nodes
  for (let i = 0; i < nodes.length; i++) {
    const numConnections = 2 + Math.floor(Math.random() * 3);
    for (let j = 0; j < numConnections; j++) {
      const targetIndex = Math.floor(Math.random() * nodes.length);
      if (targetIndex !== i && !nodes[i].connections.includes(`node-${targetIndex}`)) {
        const linkId = `link-${i}-${targetIndex}`;
        links.push({
          id: linkId,
          source: nodes[i].id,
          target: `node-${targetIndex}`,
          active: true,
        });
        nodes[i].connections.push(`node-${targetIndex}`);
      }
    }
  }
  
  return { nodes, links };
};

const initialNetwork = generateInitialNetwork();

export const useNetworkStore = create<NetworkState>((set) => ({
  nodes: initialNetwork.nodes,
  links: initialNetwork.links,
  initialState: initialNetwork,
  
  addAgent: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, hasAgent: true } : node
      ),
    })),
    
  removeAgent: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, hasAgent: false } : node
      ),
    })),
    
  toggleLink: (linkId) =>
    set((state) => ({
      links: state.links.map((link) =>
        link.id === linkId ? { ...link, active: !link.active } : link
      ),
    })),
    
  resetNetwork: () =>
    set((state) => ({
      nodes: state.initialState.nodes.map((node) => ({ ...node, hasAgent: false })),
      links: state.initialState.links.map((link) => ({ ...link, active: true })),
    })),
}));