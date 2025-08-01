// This is the complete and correct code for pages/map.js

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const LoadingComponent = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontSize: '2rem'
    }}>
    Loading Map...
  </div>
);

export default function MapPage() {
  
  const PinMapWithNoSSR = useMemo(() => dynamic(
    () => import('../components/PinMap'), 
    { 
      ssr: false, 
      loading: () => <LoadingComponent /> 
    }
  ), []);

  // The 'return' statement now correctly wraps the component in parentheses
  return (
    <PinMapWithNoSSR />
  );
}