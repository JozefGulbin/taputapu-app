// src/components/GpsTracker.jsx
'use client';

import { useState, useRef } from 'react';

export default function GpsTracker() {
  // State to store the location data
  const [location, setLocation] = useState(null);
  // State to store any errors
  const [error, setError] = useState(null);
  // State to know if we are actively tracking
  const [isTracking, setIsTracking] = useState(false);

  // Use a ref to hold the watch ID from the browser's geolocation API
  const watchIdRef = useRef(null);

  const handleStartTracking = () => {
    // Check if the browser supports Geolocation
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setIsTracking(true);
    setError(null);

    // Start watching the user's position.
    watchIdRef.current = navigator.geolocation.watchPosition(
      // Success callback
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      // Error callback
      (err) => {
        setError(`Error getting location: ${err.message}`);
        setIsTracking(false);
      },
      // Options
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleStopTracking = () => {
    // If we have a watch ID, clear the watch
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
      setIsTracking(false);
      setError("Tracking stopped.");
    }
  };

  return (
    <div className="p-4 m-4 border rounded-lg shadow-md bg-gray-50">
      <h2 className="text-xl font-bold mb-2">GPS Tracker</h2>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleStartTracking}
          disabled={isTracking}
          className="px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          Start Tracking
        </button>
        <button
          onClick={handleStopTracking}
          disabled={!isTracking}
          className="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600 disabled:bg-gray-400"
        >
          Stop Tracking
        </button>
      </div>

      {isTracking && !error && location && (
        <div className="text-green-700">Tracking location...</div>
      )}
      
      {location && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <p><strong>Latitude:</strong> {location.latitude}</p>
          <p><strong>Longitude:</strong> {location.longitude}</p>
          <p><strong>Accuracy:</strong> Approximately {location.accuracy.toFixed(2)} meters</p>
        </div>
      )}

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}