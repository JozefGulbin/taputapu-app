// pages/map.jsx

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// Dynamically import the TrackingMap component with SSR turned off
const TrackingMap = dynamic(() => import('../components/TrackingMap'), { 
  ssr: false 
});

export default function MapPage() {
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState('Ieškoma jūsų vietos...');
  const router = useRouter();
  
  // This effect runs to get the user's initial location
  useEffect(() => {
    // --- THIS IS THE FIX ---
    // Don't run the rest of the code until the router is ready
    if (!router.isReady) {
      return;
    }

    // The mode is read from the URL (e.g., /map?mode=follow)
    const { mode } = router.query;
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setStatus('');
      },
      (error) => {
        setStatus(`Klaida: ${error.message}. Prašome leisti pasiekti jūsų vietą.`);
      }
    );
  // We now depend on router.isReady as well
  }, [router.isReady, router.query]);

  // While we are looking for the location, show a loading message
  if (!location) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl">{status}</h1>
      </div>
    );
  }

  // Once location is found, render the map with the correct mode
  return (
    <TrackingMap 
      initialLatitude={location.latitude}
      initialLongitude={location.longitude}
      mode={router.query.mode} // Pass the mode ('find' or 'follow') to the component
    />
  );
}