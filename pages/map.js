// File: pages/map.js

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

function MapPage() {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  // We still get the user's location here
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  // Here is the magic! We dynamically import our Map component
  const MapWithNoSSR = dynamic(() => import('../components/map'), {
    ssr: false // This line is important. It tells Next.js to only render it on the browser
  });

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {userLocation ? (
        <MapWithNoSSR location={userLocation} />
      ) : (
        <p>Getting your location to show the map...</p>
      )}
    </div>
  );
}

export default MapPage;